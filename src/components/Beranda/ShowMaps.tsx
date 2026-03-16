import { Map, MapControls, MapRef } from "@/components/ui/map";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import MarkerMapsPky from "./MarkerMapsPky";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

export default function ShowMaps() {
  // Img Dropzone
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("default");
  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  const { theme } = useTheme();

  return (
    <div className="h-screen relative w-full">
      <Map
        theme={theme}
        ref={mapRef}
        center={[113.9152386, -2.2074064]}
        zoom={13}
        styles={
          selectedStyle
            ? { light: selectedStyle, dark: selectedStyle }
            : undefined
        }
      >
        <MapControls
          className="absolute bottom-50 right-4 z-10 sm:bottom-32 sm:me-3 lg:bottom-12 lg:me-0"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />

        <MarkerMapsPky />
      </Map>

      <div className="absolute top-20 right-4 z-10 sm:top-24 sm:me-3 lg:top-2 lg:me-0">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-background text-foreground border rounded-md px-2 py-1 text-sm shadow"
        >
          <option value="default">Default (Carto)</option>
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="openstreetmap3d">OpenStreetMap 3D</option>
        </select>
      </div>
    </div>
  );
}
