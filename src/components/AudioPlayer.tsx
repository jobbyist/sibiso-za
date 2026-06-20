import { Play } from "lucide-react";
import { openComingSoon } from "./ComingSoonModal";

export function AudioPlayer({ title }: { title: string }) {
  const triggerComingSoon = () => openComingSoon();

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-accent p-4"
      onClickCapture={(e) => {
        // Any click inside the audio player triggers the coming-soon modal.
        e.preventDefault();
        e.stopPropagation();
        triggerComingSoon();
      }}
    >
      <button
        type="button"
        aria-label={`Play ${title}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-cta text-white shadow-glow"
      >
        <Play className="h-5 w-5 translate-x-0.5" />
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Preview</span>
          <span className="tabular-nums">0%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full gradient-gold" style={{ width: `0%` }} />
        </div>
      </div>
    </div>
  );
}
