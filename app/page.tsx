import { ReviewsPage } from "@/components/ReviewsPage";
import googleMapsReviews from "@/json/google_maps.json";
import appleAppStoreReviews from "@/json/apple_appstore.json";
import googlePlayStoreReviews from "@/json/google_playstore.json";

export default function Home() {
  return (
    <ReviewsPage
      googleMaps={googleMapsReviews}
      appleAppStore={appleAppStoreReviews}
      googlePlayStore={googlePlayStoreReviews}
    />
  );
}
