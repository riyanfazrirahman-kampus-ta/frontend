import {
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { useClassificationHistory } from "@/hooks/useClassificationHistory";
import { Clock } from "lucide-react";

const getColor = (cls: string) => {
  switch (cls) {
    case "lubang":
      return "bg-red-500";
    case "retak":
      return "bg-yellow-500";
    case "alur":
      return "bg-blue-500";
    default:
      return "bg-green-500";
  }
};

export default function MarkerMapsPky() {
  const { data } = useClassificationHistory();

  return (
    <div>
      {data.map((place) => (
        <MapMarker
          key={place.id}
          longitude={place.location.longitude}
          latitude={place.location.latitude}
        >
          <MarkerContent>
            <div
              className={`size-5 rounded-full ${getColor(place.predictions[0].class)} border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
            />
            <MarkerLabel position="bottom">
              {place.predictions[0].class}
            </MarkerLabel>
          </MarkerContent>
          <MarkerPopup className="p-0 w-62">
            <div className="relative h-32 overflow-hidden rounded-t-md">
              <img
                src={place.image.url}
                alt={place.predictions[0].class}
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground tracking-wide">
                  Hasil Klasifikasi
                </span>
                <h2 className="font-semibold text-foreground leading-tight uppercase">
                  {place.predictions[0].class}
                  <span className="text-muted-foreground">
                    ({place.predictions[0].confidence.toLocaleString()}%)
                  </span>
                </h2>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{place.location.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                <span className="text-muted-foreground">
                  {new Date(
                    place.created_at._seconds * 1000,
                  ).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      ))}
    </div>
  );
}
