import type { Review, Source } from "./ReviewsPage";

interface ReviewCardProps {
  review: Review;
  source: Source;
  showSource?: boolean;
}

const sourceConfig: Record<
  Source,
  { label: string; colorVar: string; glowClass: string; badgeClass: string }
> = {
  all: {
    label: "ALL",
    colorVar: "var(--neon-red)",
    glowClass: "neon-glow-red",
    badgeClass: "neon-text-red",
  },
  google_maps: {
    label: "Google Maps",
    colorVar: "var(--neon-blue)",
    glowClass: "neon-glow-blue",
    badgeClass: "neon-text-blue",
  },
  apple_appstore: {
    label: "Apple App Store",
    colorVar: "var(--neon-purple)",
    glowClass: "neon-glow-purple",
    badgeClass: "neon-text-purple",
  },
  google_playstore: {
    label: "Google Play Store",
    colorVar: "var(--neon-green)",
    glowClass: "neon-glow-green",
    badgeClass: "neon-text-green",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-amber-500" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function ReviewCard({ review, source, showSource = false }: ReviewCardProps) {
  const cfg = sourceConfig[source];

  return (
    <article
      className="group relative flex flex-col gap-4 rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        borderColor: `${cfg.colorVar}33`,
        background: "var(--surface)",
        boxShadow: `0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${cfg.colorVar}33, inset 0 1px 0 rgba(255,255,255,0.06)`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cfg.colorVar}66`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cfg.colorVar}33`;
      }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
          style={{
            borderColor: cfg.colorVar,
            color: cfg.colorVar,
            background: `${cfg.colorVar}1a`,
          }}
        >
          {review.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "var(--foreground)" }}>{review.author}</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {new Date(review.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {showSource && (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cfg.badgeClass}`}
            style={{
              borderColor: `${cfg.colorVar}44`,
              background: `${cfg.colorVar}18`,
            }}
          >
            {cfg.label}
          </span>
        )}
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{review.text}</p>
    </article>
  );
}
