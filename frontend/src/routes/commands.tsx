import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Star, X, Filter } from "lucide-react";
import { useCommands } from "@/hooks/useCommandsQueries";
import { CommandCard } from "@/components/CommandCard";
import { CommandModal } from "@/components/CommandModal";
import { SearchBar } from "@/components/SearchBar";
import { CardSkeleton, EmptyState } from "@/components/Feedback";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const searchSchema = z.object({
  tag: z.string().optional(),
});

export const Route = createFileRoute("/commands")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Commands — CmdVoyager" },
      { name: "description", content: "Search, filter, and reuse your saved terminal commands." },
      { property: "og:title", content: "Commands — CmdVoyager" },
      { property: "og:description", content: "Search, filter, and reuse your saved terminal commands." },
    ],
  }),
  component: CommandsPage,
});

type SortKey = "recent" | "most-used" | "alpha";

function CommandsPage() {
  const { data, isLoading } = useCommands();
  const { tag: tagFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [favOnly, setFavOnly] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const commands: any[] = data ?? [];

  const allTags = useMemo(() => {
    const s = new Set<string>();
    commands.forEach((c) => c.tags.forEach((t: string) => s.add(t)));
    return Array.from(s).sort();
  }, [commands]);

  const filtered = useMemo(() => {
    let list = commands;
    if (tagFromUrl) list = list.filter((c) => c.tags.includes(tagFromUrl));
    if (favOnly) list = list.filter((c) => c.isFavorite);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.command.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.tags.some((t: string) => t.includes(q))
      );
    }
    if (sort === "recent")
      list = [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    if (sort === "most-used") list = [...list].sort((a, b) => b.usageCount - a.usageCount);
    if (sort === "alpha") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [commands, query, favOnly, sort, tagFromUrl]);

  function clearTag() {
    navigate({ search: {} });
  }

  return (
    <div className="space-y-6 animate-[fadeIn_1s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Command <span className="text-gradient">Library</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {commands.length} commands
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-cosmic text-primary-foreground font-medium hover:opacity-90 transition glow-ring"
        >
          <Plus className="h-4 w-4" /> New command
        </button>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3">
        <SearchBar value={query} onChange={setQuery} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-3 py-2.5 rounded-xl bg-input/80 border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        >
          <option value="recent">Most recent</option>
          <option value="most-used">Most used</option>
          <option value="alpha">A → Z</option>
        </select>
        <button
          onClick={() => setFavOnly((v) => !v)}
          className={`inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition ${
            favOnly
              ? "bg-stardust/15 border-stardust/40 text-stardust"
              : "bg-input/80 border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star className={`h-4 w-4 ${favOnly ? "fill-stardust" : ""}`} />
          Favorites
        </button>
      </div>

      {/* Tag filter strip */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {tagFromUrl && (
            <button
              onClick={clearTag}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-destructive/15 text-destructive border border-destructive/30 shrink-0"
            >
              clear #{tagFromUrl} <X className="h-3 w-3" />
            </button>
          )}
          {allTags.map((t) => {
            const active = tagFromUrl === t;
            return (
              <button
                key={t}
                onClick={() => navigate({ search: active ? {} : { tag: t } })}
                className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap transition shrink-0 ${
                  active
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "bg-muted/40 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                #{t}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No commands match your filters"
          hint="Try clearing search or tags, or launch a new command."
          action={
            <button
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-cosmic text-primary-foreground font-medium"
            >
              <Plus className="h-4 w-4" /> Add command
            </button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CommandCard
              key={c.id}
              cmd={c}
              onEdit={(cmd: any) => {
                setEditing(cmd);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <CommandModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </div>
  );
}
