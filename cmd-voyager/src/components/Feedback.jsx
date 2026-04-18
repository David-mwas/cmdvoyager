export function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 animate-pulse">
      <div className="h-3 w-16 bg-muted rounded mb-3" />
      <div className="h-4 w-3/4 bg-muted rounded mb-4" />
      <div className="h-12 w-full bg-muted/60 rounded mb-3" />
      <div className="h-3 w-full bg-muted rounded mb-2" />
      <div className="flex gap-2 mb-4">
        <div className="h-4 w-12 bg-muted rounded" />
        <div className="h-4 w-12 bg-muted rounded" />
      </div>
      <div className="h-9 w-full bg-muted rounded" />
    </div>
  );
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="glass-card rounded-2xl p-10 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-cosmic grid place-items-center animate-float glow-ring">
        <span className="text-2xl">🛰️</span>
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      {hint && <p className="text-sm text-muted-foreground mt-1">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
