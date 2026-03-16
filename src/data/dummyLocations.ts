// src/data/dummyLocations.ts

export type LocationType = {
  id: number;
  name: string;
  damageType: string;
  severity: "Berat" | "Sedang" | "Ringan";
  coordinates: [number, number];
  description: string;
  date: string;
  image: string;
};

export const dummyLocations: LocationType[] = [
  {
    id: 1,
    name: "Jalan Tjilik Riwut",
    damageType: "Jalan Berlubang",
    severity: "Berat",
    coordinates: [-2.2136, 113.9108],
    description: "Kerusakan parah di depan kantor gubernur",
    date: "15 Juni 2023",
    image: "https://picsum.photos/seed/palangkaraya1/300/200.jpg",
  },
  {
    id: 2,
    name: "Jalan George Obos",
    damageType: "Retak Melintang",
    severity: "Sedang",
    coordinates: [-2.2099, 113.9123],
    description: "Retak melintang sepanjang 50 meter",
    date: "14 Juni 2023",
    image: "https://picsum.photos/seed/palangkaraya2/300/200.jpg",
  },
  {
    id: 3,
    name: "Jalan Yos Sudarso",
    damageType: "Jalan Bergelombang",
    severity: "Ringan",
    coordinates: [-2.2214, 113.9056],
    description: "Permukaan jalan tidak rata",
    date: "13 Juni 2023",
    image: "https://picsum.photos/seed/palangkaraya3/300/200.jpg",
  },
  {
    id: 4,
    name: "Jalan Ahmad Yani",
    damageType: "Tepi Jalan Hancur",
    severity: "Sedang",
    coordinates: [-2.2058, 113.9021],
    description: "Tepi jalan hancur di dekat pasar besar",
    date: "12 Juni 2023",
    image: "https://picsum.photos/seed/palangkaraya4/300/200.jpg",
  },
  {
    id: 5,
    name: "Jalan Diponegoro",
    damageType: "Jalan Berlubang",
    severity: "Ringan",
    coordinates: [-2.2187, 113.9154],
    description: "Beberapa lubang kecil di sepanjang jalan",
    date: "11 Juni 2023",
    image: "https://picsum.photos/seed/palangkaraya5/300/200.jpg",
  },
];
