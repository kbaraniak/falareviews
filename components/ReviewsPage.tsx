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

const tabs: { id: Source; label: string; color: string; glowClass: string; activeBg: string }[] = [
  {
    id: "all",
    label: "ALL",
    color: "var(--neon-red)",
    glowClass: "neon-glow-red",
    activeBg: "rgba(204,0,34,0.06)",
  },
  {
    id: "google_maps",
    label: "Google Maps",
    color: "var(--neon-blue)",
    glowClass: "neon-glow-blue",
    activeBg: "rgba(0,112,192,0.06)",
  },
  {
    id: "apple_appstore",
    label: "Apple App Store",
    color: "var(--neon-purple)",
    glowClass: "neon-glow-purple",
    activeBg: "rgba(124,58,237,0.06)",
  },
  {
    id: "google_playstore",
    label: "Google Play Store",
    color: "var(--neon-green)",
    glowClass: "neon-glow-green",
    activeBg: "rgba(26,127,55,0.06)",
  },
];

const sourceColorMap: Record<Source, string> = {
  all: "neon-text-red",
  google_maps: "neon-text-blue",
  apple_appstore: "neon-text-purple",
  google_playstore: "neon-text-green",
};

const sourceLabelMap: Record<Source, string> = {
  all: "ALL",
  google_maps: "Google Maps",
  apple_appstore: "Apple App Store",
  google_playstore: "Google Play Store",
};

const sortModes: { id: SortMode; label: string }[] = [
  { id: "highest", label: "Highest" },
  { id: "lowest", label: "Lowest" },
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
      <header className="relative overflow-hidden border-b border-gray-200 py-12 px-6 text-center">
        {/* Ambient accent background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(204,0,34,0.08) 0%, transparent 70%)",
          }}
        />
        <p
          className="relative mb-2 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--neon-red)" }}
        >
          Customer Reviews
        </p>
        <h1
          className="relative text-5xl font-extrabold tracking-tight neon-text-red font-mono-display"
          style={{ letterSpacing: "-0.02em" }}
        >
          FALA
        </h1>
        <p className="relative mt-3 text-base text-gray-500">
          What our customers are saying across all platforms
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Filter tabs */}
        <div className="mb-4 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  isActive ? tab.glowClass : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                }`}
                style={
                  isActive
                    ? { background: tab.activeBg }
                    : {}
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sort badges */}
        <div className="mb-8 flex flex-wrap gap-2">
          {sortModes.map((mode) => {
            const isActive = sortMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSortMode(mode.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "border-amber-400 bg-amber-50 text-amber-600"
                    : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            className={`text-lg font-bold uppercase tracking-widest ${sourceColorMap[activeTab]}`}
          >
            {sourceLabelMap[activeTab]}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-amber-600">★ {averageRating}</span>
            <span className="text-sm text-gray-400">
              {displayed.length} review{displayed.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Review cards */}
        {displayed.length === 0 ? (
          <p className="py-20 text-center text-gray-400">No reviews yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <footer className="mt-16 border-t border-gray-200 py-8 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} FALA · All reviews are from verified platforms</p>
      </footer>
    </main>
  );
}
