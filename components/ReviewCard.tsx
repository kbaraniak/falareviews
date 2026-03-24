import type { Review, Source } from "./ReviewsPage";

interface ReviewCardProps {
  review: Review;
  source: Source;
  showSource?: boolean;
}

const sourceConfig: Record<Source, { label: string; color: string }> = {
  all: { label: "Wszystkie", color: "#6B7280" },
  google_maps: { label: "Google Maps", color: "#1A73E8" },
  apple_appstore: { label: "App Store", color: "#555555" },
  google_playstore: { label: "Google Play", color: "#34A853" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#FFCD00" : "#E5E7EB", fontSize: "1rem" }}>
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
      className="flex flex-col gap-3 p-5 transition-all duration-200 hover:shadow-md"
      style={{
        background: "var(--surface)",
        borderRadius: "16px",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{ background: "var(--icon-bg)", color: "#111827" }}
        >
          {review.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {review.author}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {new Date(review.date).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {showSource && (
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{
              background: "#F3F4F6",
              color: cfg.color,
            }}
          >
            {cfg.label}
          </span>
        )}
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }} />

      {/* Review text */}
      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {review.text}
      </p>
    </article>
  );
}

