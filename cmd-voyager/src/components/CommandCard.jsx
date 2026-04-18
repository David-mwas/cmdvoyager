import { useState } from "react";
import { Copy, Check, Star, Trash2, Pencil, Zap } from "lucide-react";
import { useDeleteCommand, useIncrementUsage, useToggleFavorite } from "@/hooks/useCommandsQueries";

export function CommandCard({ cmd, onEdit }) {
  const [copied, setCopied] = useState(false);
  const fav = useToggleFavorite();
  const inc = useIncrementUsage();
  const del = useDeleteCommand();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cmd.command);
      setCopied(true);
      inc.mutate(cmd.id);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="group relative glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-ring">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
              {cmd.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Zap className="h-3 w-3 text-stardust" /> {cmd.usageCount} uses
            </span>
          </div>
          <h3 className="font-semibold truncate">{cmd.title}</h3>
        </div>
        <button
          onClick={() => fav.mutate(cmd.id)}
          aria-label="Toggle favorite"
          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Star
            className={`h-4 w-4 transition-colors ${
              cmd.isFavorite ? "fill-stardust text-stardust" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="relative font-mono text-sm bg-background/60 border border-border rounded-lg p-3 mb-3 overflow-x-auto">
        <code className="text-accent whitespace-pre">{cmd.command}</code>
      </div>

      {cmd.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{cmd.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {cmd.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-cosmic text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={() => onEdit?.(cmd)}
          className="p-2 rounded-lg border border-border hover:bg-muted/50 transition"
          aria-label="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${cmd.title}"?`)) del.mutate(cmd.id);
          }}
          className="p-2 rounded-lg border border-border hover:bg-destructive/20 hover:text-destructive transition"
          aria-label="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
