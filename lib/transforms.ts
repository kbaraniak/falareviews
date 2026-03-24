import type { Review } from "@/components/ReviewsPage";

// ── Raw SerpAPI shapes ──────────────────────────────────────────────────────

interface GoogleMapsRawReview {
  review_id: string;
  rating: number;
  iso_date: string;
  snippet?: string;
  user: { name: string };
}

interface GoogleMapsRaw {
  reviews: GoogleMapsRawReview[];
}

interface AppleRawReview {
  id: string | number;
  rating: number;
  review_date: string;
  text?: string;
  author: { name: string };
}

interface AppleRaw {
  reviews: AppleRawReview[];
}

interface GooglePlayRawReview {
  id: string;
  title: string;
  rating: number;
  iso_date?: string;
  date?: string;
  snippet?: string;
}

interface GooglePlayRaw {
  reviews: GooglePlayRawReview[];
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function safeISODate(value: string | undefined): string {
  if (!value) return new Date(0).toISOString();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString();
}

// ── Transformers ─────────────────────────────────────────────────────────────

export function transformGoogleMaps(raw: GoogleMapsRaw): Review[] {
  return raw.reviews
    .filter((r) => r.snippet)
    .map((r) => ({
      id: r.review_id,
      author: r.user.name,
      rating: r.rating,
      date: safeISODate(r.iso_date),
      text: r.snippet as string,
      avatar: initials(r.user.name),
    }));
}

export function transformAppleAppStore(raw: AppleRaw): Review[] {
  return raw.reviews
    .filter((r) => r.text)
    .map((r) => ({
      id: String(r.id),
      author: r.author.name,
      rating: r.rating,
      date: safeISODate(r.review_date),
      text: r.text as string,
      avatar: initials(r.author.name),
    }));
}

export function transformGooglePlayStore(raw: GooglePlayRaw): Review[] {
  return raw.reviews
    .filter((r) => r.snippet)
    .map((r) => ({
      id: r.id,
      author: r.title,
      rating: r.rating,
      date: r.iso_date ?? safeISODate(r.date),
      text: r.snippet as string,
      avatar: initials(r.title),
    }));
}
