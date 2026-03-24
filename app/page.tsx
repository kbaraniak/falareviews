import { ReviewsPage } from "@/components/ReviewsPage";
import {
  transformGoogleMaps,
  transformAppleAppStore,
  transformGooglePlayStore,
} from "@/lib/transforms";
import googleMapsRaw from "@/json/google_maps.json";
import appleAppStoreRaw from "@/json/apple_appstore.json";
import googlePlayStoreRaw from "@/json/google_playstore.json";

export default function Home() {
  return (
    <ReviewsPage
      googleMaps={transformGoogleMaps(googleMapsRaw)}
      appleAppStore={transformAppleAppStore(appleAppStoreRaw)}
      googlePlayStore={transformGooglePlayStore(googlePlayStoreRaw)}
    />
  );
}
