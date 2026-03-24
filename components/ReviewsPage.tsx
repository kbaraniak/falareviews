"use client";

import { useState } from "react";
import { ReviewCard } from "./ReviewCard";

type SortMode = "highest" | "lowest";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export type Source = "all" | "google_maps" | "apple_appstore" | "google_playstore";

interface ReviewsPageProps {
  googleMaps: Review[];
  appleAppStore: Review[];
  googlePlayStore: Review[];
}

const tabs: { id: Source; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "google_maps", label: "Google Maps" },
  { id: "apple_appstore", label: "App Store" },
  { id: "google_playstore", label: "Google Play" },
];

const sourceLabelMap: Record<Source, string> = {
  all: "Wszystkie",
  google_maps: "Google Maps",
  apple_appstore: "App Store",
  google_playstore: "Google Play",
};

const sortModes: { id: SortMode; label: string }[] = [
  { id: "highest", label: "Najwyższe" },
  { id: "lowest", label: "Najniższe" },
];

export function ReviewsPage({ googleMaps, appleAppStore, googlePlayStore }: ReviewsPageProps) {
  const [activeTab, setActiveTab] = useState<Source>("all");
  const [sortMode, setSortMode] = useState<SortMode>("highest");

  const allReviews: (Review & { source: Source })[] = [
    ...googleMaps.map((r) => ({ ...r, source: "google_maps" as Source })),
    ...appleAppStore.map((r) => ({ ...r, source: "apple_appstore" as Source })),
    ...googlePlayStore.map((r) => ({ ...r, source: "google_playstore" as Source })),
  ];

  const filtered =
    activeTab === "all"
      ? allReviews
      : allReviews.filter((r) => r.source === activeTab);

  const displayed = [...filtered].sort((a, b) =>
    sortMode === "highest" ? b.rating - a.rating : a.rating - b.rating
  );

  const averageRating =
    displayed.length > 0
      ? (displayed.reduce((sum, r) => sum + r.rating, 0) / displayed.length).toFixed(1)
      : "–";

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="px-6 pt-10 pb-8 text-center"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "var(--foreground)" }}>
          Faluj z Falą
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Najnowsze opinie z świata Fali
        </p>

        {/* Rating summary bar */}
        <div
          className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3 rounded-2xl px-5 py-3"
          style={{ background: "var(--background)", border: "1px solid var(--border-subtle)" }}
        >
          <span className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>
            {averageRating}
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-base"
                  style={{ color: i < Math.round(parseFloat(averageRating)) ? "#FFCD00" : "#E5E7EB" }}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {displayed.length} {displayed.length === 1 ? "opinia" : "opinii"}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Filter tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-2xl px-5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none"
                style={
                  isActive
                    ? {
                        background: "#FFCD00",
                        color: "#111827",
                        boxShadow: "0 2px 8px rgba(255,205,0,0.35)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--muted)",
                        border: "1px solid var(--border-subtle)",
                      }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sort badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Sortuj:
          </span>
          {sortModes.map((mode) => {
            const isActive = sortMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSortMode(mode.id)}
                className="rounded-full px-4 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none"
                style={
                  isActive
                    ? { background: "#FFCD00", color: "#111827" }
                    : {
                        background: "var(--surface)",
                        color: "var(--muted)",
                        border: "1px solid var(--border-subtle)",
                      }
                }
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Section heading */}
        <div
          className="mb-6 flex items-center justify-between border-b pb-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <h2 className="text-base font-bold" style={{ color: "var(--foreground)" }}>
            {sourceLabelMap[activeTab]}
          </h2>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {displayed.length} {displayed.length === 1 ? "opinia" : "opinii"}
          </span>
        </div>

        {/* Review cards */}
        {displayed.length === 0 ? (
          <p className="py-20 text-center" style={{ color: "var(--muted)" }}>Brak opinii.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                source={review.source}
                showSource={activeTab === "all"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className="mt-12 py-6 text-center text-xs px-4"
        style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--muted)" }}
      >
        <p className="break-words">© {new Date().getFullYear()} Faluj z Falą · Aplikacja nie jest powiązana z SystemFala i InnoBaltica · Wszystkie opinie pochodzą ze zweryfikowanych platform</p>
      </footer>
    </main>
  );
}

