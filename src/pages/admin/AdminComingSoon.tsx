import { useNavigate } from "react-router-dom";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function AdminComingSoon({ title, description }: ComingSoonProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
        <Construction size={28} className="text-accent" />
      </div>
      <h1 className="text-2xl font-bold text-foreground font-display mb-2">{title}</h1>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">{description}</p>
      <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg mb-6">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <span className="text-xs text-accent font-medium">In Development — Coming Soon</span>
      </div>
      <button
        onClick={() => navigate("/admin")}
        className="px-5 py-2.5 bg-secondary hover:bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
