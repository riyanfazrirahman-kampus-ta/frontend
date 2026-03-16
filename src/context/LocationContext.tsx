import { createContext, useContext, useEffect, useRef, useState } from "react";

interface LocationType {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: LocationType | null;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  loading: true,
  error: null,
});

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError("Gagal mendapatkan lokasi");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );

    // cleanup saat component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};
