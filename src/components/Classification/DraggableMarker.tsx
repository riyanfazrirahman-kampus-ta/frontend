"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRef,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLocationContext } from "@/context/LocationContext";

export function DraggableMarker() {
  const { location } = useLocationContext();

  const [draggableMarker, setDraggableMarker] = useState({
    lng: 113.9152386,
    lat: -2.2074064,
  });

  useEffect(() => {
    if (!location) return;

    setDraggableMarker({
      lng: location.longitude,
      lat: location.latitude,
    });

    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 15,
    });
  }, [location]);

  const mapRef = useRef<MapRef>(null);

  const { theme } = useTheme();

  return (
    <div className="h-[400px] w-full rounded-xl border overflow-hidden">
      <Map
        theme={theme}
        ref={mapRef}
        center={
          location
            ? [location.longitude, location.latitude]
            : [113.9152386, -2.2074064]
        }
        zoom={15}
      >
        <MapControls
          className="absolute bottom-12 right-2 z-10"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />

        <MapMarker
          draggable
          longitude={draggableMarker.lng}
          latitude={draggableMarker.lat}
          onDragEnd={(lngLat) => {
            setDraggableMarker({ lng: lngLat.lng, lat: lngLat.lat });
          }}
        >
          <MarkerContent>
            <div className="cursor-move">
              <MapPin
                className="fill-black stroke-white dark:fill-white"
                size={28}
              />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground">
                {draggableMarker.lat.toFixed(4)},{" "}
                {draggableMarker.lng.toFixed(4)}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  );
}
