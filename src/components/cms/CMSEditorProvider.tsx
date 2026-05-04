import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchContent, defaultContent, saveContent, CMSSection } from "@/lib/sanity";

type CMSContentState = typeof defaultContent;

interface CMSEditorContextType {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  content: CMSContentState;
  updateContent: (section: CMSSection, key: string, value: string) => void;
  updateContentLive: (section: CMSSection, key: string, value: string) => void;
  commitHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  discard: () => void;
  saveAll: () => Promise<void>;
}

const CMSEditorContext = createContext<CMSEditorContextType | null>(null);

const ALL_SECTIONS = Object.keys(defaultContent) as CMSSection[];

export function CMSEditorProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<CMSContentState>(defaultContent);
  const [initialContent, setInitialContent] = useState<CMSContentState>(defaultContent);

  // History for undo/redo
  const [history, setHistory] = useState<CMSContentState[]>([defaultContent]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load ALL sections on mount
  useEffect(() => {
    const loadAll = async () => {
      try {
        const results = await Promise.all(ALL_SECTIONS.map(s => fetchContent(s)));
        const fullState = ALL_SECTIONS.reduce((acc, section, i) => {
          // Defensive merge: combine defaults with stored values so no key is ever missing
          acc[section] = { ...defaultContent[section], ...(results[i] || {}) } as any;
          return acc;
        }, {} as CMSContentState);

        setContent(fullState);
        setInitialContent(fullState);
        setHistory([fullState]);
        setHistoryIndex(0);
      } catch (err) {
        console.error("CMS Load Failed:", err);
      }
    };
    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener("cms_updated", handleUpdate);
    return () => window.removeEventListener("cms_updated", handleUpdate);
  }, []);

  const updateContentLive = React.useCallback((section: CMSSection, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  }, []);

  const commitHistory = React.useCallback(() => {
    setContent(currentContent => {
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        if (JSON.stringify(newHistory[newHistory.length - 1]) !== JSON.stringify(currentContent)) {
          newHistory.push(currentContent);
          setHistoryIndex(newHistory.length - 1);
        }
        return newHistory;
      });
      return currentContent;
    });
  }, [historyIndex]);

  const undo = React.useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  }, [history, historyIndex]);

  const redo = React.useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  }, [history, historyIndex]);

  const discard = React.useCallback(() => {
    setContent(initialContent);
    setHistory([initialContent]);
    setHistoryIndex(0);
  }, [initialContent]);

  const saveAll = React.useCallback(async () => {
    await Promise.all(
      ALL_SECTIONS.map(section => saveContent(section, content[section]))
    );
  }, [content]);

  const contextValue = React.useMemo(() => ({
    isEditMode,
    setIsEditMode,
    content,
    updateContent: updateContentLive,
    updateContentLive,
    commitHistory,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    discard,
    saveAll,
  }), [
    isEditMode,
    content,
    historyIndex,
    history.length,
    updateContentLive,
    commitHistory,
    undo,
    redo,
    discard,
    saveAll,
  ]);

  return (
    <CMSEditorContext.Provider value={contextValue}>
      {children}
    </CMSEditorContext.Provider>
  );
}

export const useCMSState = () => {
  const context = useContext(CMSEditorContext);
  if (!context) throw new Error("useCMSState must be used within CMSEditorProvider");
  return context;
};
