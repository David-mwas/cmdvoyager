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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group min-w-0 shrink-1">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-cosmic grid place-items-center glow-ring group-hover:scale-105 transition-transform shrink-0">
            <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight truncate">
            <div className="font-bold tracking-tight text-sm sm:text-base truncate">
              <span className="text-gradient">Cmd</span>Voyager
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
              {total} commands
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 shrink-0">
          <NavItem to="/commands" icon={<Terminal className="h-4 w-4" />} label="Commands" />
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/commands" }}
      activeProps={{ className: "bg-primary/15 text-foreground glow-ring" }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors whitespace-nowrap shrink-0"
    >
      {icon}
      {label}
    </Link>
  );
}
