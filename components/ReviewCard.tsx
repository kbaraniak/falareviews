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
    colorVar: "var(--neon-white)",
    glowClass: "neon-glow-white",
    badgeClass: "neon-text-white",
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
          className={i < rating ? "text-yellow-300" : "text-white/20"}
          style={
            i < rating
              ? { textShadow: "0 0 6px #ffe600, 0 0 12px #ffe600" }
              : {}
          }
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
        borderColor: `${cfg.colorVar}44`,
        background: "rgba(10,10,20,0.7)",
        boxShadow: `0 0 0 1px ${cfg.colorVar}22`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${cfg.colorVar}66, 0 0 6px ${cfg.colorVar}44`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cfg.colorVar}99`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${cfg.colorVar}22`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cfg.colorVar}44`;
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
            boxShadow: `0 0 8px ${cfg.colorVar}66`,
            background: `${cfg.colorVar}11`,
          }}
        >
          {review.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white/90">{review.author}</p>
          <p className="text-xs text-white/40">
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
              borderColor: `${cfg.colorVar}55`,
              background: `${cfg.colorVar}11`,
            }}
          >
            {cfg.label}
          </span>
        )}
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="flex-1 text-sm leading-relaxed text-white/70">{review.text}</p>
    </article>
  );
}
