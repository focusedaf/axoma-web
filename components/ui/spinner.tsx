export function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
      {text || "Loading..."}
    </div>
  );
}
