import { ClassificationData } from "../api/classificationApi";

export type MapLocation = {
  id: string;
  name: string;
  damageType: string;
  coordinates: [number, number];
  image: string;
};

export function mapToLocations(data: ClassificationData[]): MapLocation[] {
  return data
    .map((item) => {
      if (!item.location?.latitude || !item.location?.longitude) return null;

      // ambil confidence tertinggi
      const top = item.predictions.reduce((a, b) =>
        b.confidence > a.confidence ? b : a,
      );

      return {
        id: item.id,
        name: item.location.address || "Unknown",
        damageType: top.class,
        coordinates: [item.location.latitude, item.location.longitude] as [
          number,
          number,
        ],
        image: item.image.url,
      };
    })
    .filter(Boolean) as MapLocation[];
}
