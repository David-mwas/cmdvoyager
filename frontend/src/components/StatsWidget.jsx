export function StatsWidget({ icon: Icon, label, value, hint, accent = "primary" }) {
  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
      <div
        className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: `var(--color-${accent})` }}
      />
      <div className="flex items-start justify-between mb-3 relative">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </div>
        <div
          className="p-2 rounded-lg"
          style={{ background: `color-mix(in oklab, var(--color-${accent}) 15%, transparent)` }}
        >
          <Icon className="h-4 w-4" style={{ color: `var(--color-${accent})` }} />
        </div>
      </div>
      <div className="text-3xl font-bold tracking-tight relative">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1 relative">{hint}</div>}
    </div>
  );
}
