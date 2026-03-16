"use client";

import {
  Map,
  MapControls,
  MapMarker,
  MapRef,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { useLocationContext } from "@/context/LocationContext";
import { useTheme } from "@/context/ThemeContext";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAddress } from "../ui/address";

export default function DraggableMarker({ setLocation }: any) {
  const { location } = useLocationContext();

  const [draggableMarker, setDraggableMarker] = useState({
    lng: 113.9152386,
    lat: -2.2074064,
  });

  const mapRef = useRef<MapRef>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!location) return;

    const newLocation = {
      lng: location.longitude,
      lat: location.latitude,
    };

    setDraggableMarker(newLocation);

    // ambil address dari koordinat
    const fetchAddress = async () => {
      const address = await getAddress(newLocation.lat, newLocation.lng);

      setLocation({
        latitude: newLocation.lat,
        longitude: newLocation.lng,
        address: address || "",
      });
    };

    fetchAddress();

    mapRef.current?.flyTo({
      center: [newLocation.lng, newLocation.lat],
      zoom: 15,
    });
  }, [location]);

  return (
    <div className="h-[200px] w-full rounded-xl border overflow-hidden">
      <Map
        theme={theme}
        ref={mapRef}
        center={[draggableMarker.lng, draggableMarker.lat]}
        zoom={15}
      >
        <MapControls
          className="absolute bottom-6 right-2 z-10 scale-75"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />

        <MapMarker
          draggable
          longitude={draggableMarker.lng}
          latitude={draggableMarker.lat}
          onDragEnd={async (lngLat) => {
            const lat = lngLat.lat;
            const lng = lngLat.lng;

            setDraggableMarker({ lat, lng });

            const address = await getAddress(lat, lng);

            setLocation({
              latitude: lat,
              longitude: lng,
              address: address || "",
            });
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
