import { Link } from "@tanstack/react-router";
import { Rocket, LayoutDashboard, Terminal } from "lucide-react";
import { getXP } from "@/services/commandsService";
import { useCommands } from "@/hooks/useCommandsQueries";

export function Navbar() {
  const { data } = useCommands();
  const xp = typeof window !== "undefined" ? getXP() : 0;
  const level = Math.floor(xp / 10) + 1;
  const progress = (xp % 10) * 10;
  const total = data?.length ?? 0;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/60 border-b border-border py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-cosmic grid place-items-center glow-ring group-hover:scale-105 transition-transform">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-tight">
              <span className="text-gradient">Cmd</span>Voyager
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {total} commands · charted
            </div>
          </div>
        </Link>

        <nav className="ml-4 hidden sm:flex items-center gap-1">
          <NavItem to="/commands" icon={<LayoutDashboard className="h-4 w-4" />} label="Commands" />
          {/* <NavItem to="/commands" icon={<Terminal className="h-4 w-4" />} label="Commands" /> */}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
            <span className="text-xs font-mono text-muted-foreground">LVL</span>
            <span className="text-sm font-bold text-gradient">{level}</span>
            <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-cosmic transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground">{xp} XP</span>
          </div> */}
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      activeProps={{ className: "bg-primary/15 text-foreground glow-ring" }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
