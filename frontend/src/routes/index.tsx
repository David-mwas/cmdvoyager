import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal, Star, Flame, Sparkles, Zap, Plus } from "lucide-react";
import { useCommands } from "@/hooks/useCommandsQueries";
import { StatsWidget } from "@/components/StatsWidget";
import { CardSkeleton, EmptyState } from "@/components/Feedback";
import { getXP } from "@/services/commandsService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CmdVoyager" },
      { name: "description", content: "Your command galaxy at a glance: stats, favorites, and most used terminal commands." },
      { property: "og:title", content: "Dashboard — CmdVoyager" },
      { property: "og:description", content: "Your command galaxy at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading } = useCommands();
  const commands: any[] = data ?? [];
  const xp = typeof window !== "undefined" ? getXP() : 0;
  const level = Math.floor(xp / 10) + 1;
  const progress = (xp % 10) * 10;

  const totalUses = commands.reduce((s: number, c: any) => s + (c.usageCount || 0), 0);
  const favorites = commands.filter((c: any) => c.isFavorite);
  const mostUsed = [...commands].sort((a: any, b: any) => b.usageCount - a.usageCount).slice(0, 4);
  const recent = [...commands]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const tagCounts: Record<string, number> = {};
  commands.forEach((c: any) => c.tags.forEach((t: string) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div className="space-y-8 animate-[fadeIn_1s_ease-out]">
      {/* Hero */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden animate-float-slow">
        <div className="absolute inset-0 bg-gradient-cosmic opacity-10" />
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold mb-3">
              <Sparkles className="h-3 w-3 animate-pulse" /> Commander Console
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back, <span className="text-gradient">Voyager</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Your command galaxy is in orbit. Every command you copy fuels your XP — keep exploring.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsWidget icon={Terminal} label="Commands" value={commands.length} hint="in your library" accent="primary" />
        <StatsWidget icon={Star} label="Favorites" value={favorites.length} hint="starred for liftoff" accent="stardust" />
        <StatsWidget icon={Flame} label="Total uses" value={totalUses} hint="copies fired" accent="nebula" />
        <StatsWidget icon={Zap} label="XP earned" value={xp} hint={`Level ${level}`} accent="cosmic" />
      </section>

      {/* Most used + Recent */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:glow-ring">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2">
              <Flame className="h-4 w-4 text-nebula animate-pulse" /> Most used
            </h2>
            <Link to="/commands" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-muted/40 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : mostUsed.length === 0 ? (
            <p className="text-sm text-muted-foreground">No commands yet.</p>
          ) : (
            <ul className="space-y-2">
              {mostUsed.map((c) => (
                <MiniRow key={c.id} cmd={c} />
              ))}
            </ul>
          )}
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:glow-ring">
          <h2 className="font-bold flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" /> Recently added
          </h2>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-muted/40 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <EmptyState
              title="No commands yet"
              hint="Launch your first command to begin charting the stars."
              action={
                <Link
                  to="/commands"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-cosmic text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4" /> Add command
                </Link>
              }
            />
          ) : (
            <ul className="space-y-2">
              {recent.map((c) => (
                <MiniRow key={c.id} cmd={c} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Tags */}
      <section className="glass-card rounded-2xl p-4 sm:p-6">
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary animate-pulse" /> Popular tags
        </h2>
        {topTags.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tag your commands to see them here.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {topTags.map(([tag, n]) => (
              <Link
                key={tag}
                to="/commands"
                search={{ tag } as never}
                className="px-3 py-1.5 rounded-full interactive-card text-sm transition-all hover:scale-105"
              >
                <span className="text-foreground">#{tag}</span>
                <span className="ml-2 text-xs text-muted-foreground font-mono">{n}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MiniRow({ cmd }: { cmd: any }) {
  return (
    <li className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/40 border border-border hover:border-primary/40 transition">
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{cmd.title}</div>
        <code className="text-xs text-accent font-mono truncate block">{cmd.command}</code>
      </div>
      <div className="text-xs text-muted-foreground font-mono whitespace-nowrap flex items-center gap-1">
        <Zap className="h-3 w-3 text-stardust" />
        {cmd.usageCount}
      </div>
    </li>
  );
}
