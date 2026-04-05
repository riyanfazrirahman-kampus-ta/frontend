import {
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { useClassificationHistory } from "@/hooks/useClassificationHistory";
import { Clock } from "lucide-react";
import PreviewImage from "../ui/images/PreviewImage";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getClass } from "@/utils/classification";

const getColor = (cls: string) => {
  switch (cls) {
    case "lubang":
      return "bg-red-500";
    case "retak":
      return "bg-blue-500";
    case "alur":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};

export default function MarkerMapsPky() {
  const { data } = useClassificationHistory();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("selected");

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      setOpenId(selectedId);
    }
  }, [selectedId]);

  return (
    <div>
      {data.map((item) => (
        <MapMarker
          key={item.id}
          longitude={item.location.longitude}
          latitude={item.location.latitude}
        >
          <MarkerContent>
            <div className="relative flex items-center justify-center">
              {/* Efek ping */}
              {openId === item.id && (
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-50 animate-ping"></span>
              )}

              {/* Marker utama */}
              <div
                onClick={() => setOpenId(item.id)}
                className={`relative size-5 rounded-full ${getColor(
                  item.predictions[0].class,
                )} border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
              />
            </div>

            <MarkerLabel position="bottom">
              {getClass(item.predictions[0].class)}
            </MarkerLabel>
          </MarkerContent>

          {openId === item.id && (
            <MarkerPopup className="p-0 w-70">
              <div className="relative h-42 overflow-hidden rounded-t-md">
                <PreviewImage
                  header={`${item.image.public_id}.${item.image.format}`}
                  src={item.image.url}
                  alt={item.image.format}
                  className="h-full w-full"
                />
              </div>

              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground tracking-wide">
                    Hasil Klasifikasi
                  </span>

                  <h2 className="font-semibold text-foreground leading-tight uppercase">
                    {item.predictions[0].class}
                    <span className="text-muted-foreground ms-1">
                      ({item.predictions[0].confidence.toLocaleString()}%)
                    </span>
                  </h2>
                </div>

                <div className="text-sm">
                  <span className="font-medium">{item.location.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>
                      {new Date(
                        item.created_at._seconds * 1000,
                      ).toLocaleDateString("id-ID")}
                    </span>
                  </div>

                  <span className="text-gray-900 dark:text-slate-100 bg-gray-200 dark:bg-gray-700 rounded-2xl px-3 text-[0.6rem]">
                    {item.location.latitude.toFixed(5)},{" "}
                    {item.location.longitude.toFixed(5)}
                  </span>
                </div>
              </div>
            </MarkerPopup>
          )}
        </MapMarker>
      ))}
    </div>
  );
}
