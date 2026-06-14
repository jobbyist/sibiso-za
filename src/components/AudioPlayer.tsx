import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export function AudioPlayer({ title }: { title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-accent p-4">
      {/* Silent placeholder source; replace with real episode audio when available */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-cta text-white shadow-glow"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{playing ? "Playing" : "Preview"}</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full gradient-gold transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
