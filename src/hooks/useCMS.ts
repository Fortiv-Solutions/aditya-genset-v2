import { useState, useEffect } from "react";
import { fetchContent, defaultContent } from "@/lib/sanity";

type ContentType = "welcome" | "productConfig" | "showcase";

export function useCMS<T extends ContentType>(type: T) {
  const [content, setContent] = useState<typeof defaultContent[T]>(defaultContent[T]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContent(type);
        if (data) {
          setContent((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error(`Error loading CMS content for ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
    
    // Listen for custom event so CMS updates reflect instantly in the admin preview
    const handleContentUpdate = () => {
      loadContent();
    };
    window.addEventListener("cms_updated", handleContentUpdate);
    return () => window.removeEventListener("cms_updated", handleContentUpdate);
  }, [type]);

  return { content, loading };
}
