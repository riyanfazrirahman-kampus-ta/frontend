export interface Prediction {
  class: string;
  confidence: number;
}

export interface ClassificationData {
  id: string;
  image: {
    url: string;
    public_id: string;
    bytes: number;
    format: string;
  };
  model: string;
  predictions: Prediction[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  created_at: {
    _seconds: number;
    _nanoseconds: number;
  };
  updated_at: {
    _seconds: number;
    _nanoseconds: number;
  };
}
const BASE_URL = "http://localhost:3000/api";

// Models Status
export async function fetchStatus() {
  const res = await fetch(`${BASE_URL}/classification`);

  if (!res.ok) throw new Error("Gagal fetch history");

  const json = await res.json();
  if (json.status !== "success") return [];

  return json.data;
}

// Models Tersedia
export async function fetchModelsAvalible() {
  const res = await fetch(`${BASE_URL}/classification/models`);

  if (!res.ok) throw new Error("Gagal fetch history");

  const json = await res.json();
  if (json.status !== "success") return [];

  return json.data;
}

// Get Data History
export async function fetchClassificationHistory(): Promise<
  ClassificationData[]
> {
  const res = await fetch(`${BASE_URL}/classification/history`);

  if (!res.ok) throw new Error("Gagal fetch history");

  const json = await res.json();
  if (json.status !== "success") return [];

  return json.data;
}

// Prediksi
export async function predictImage(file: File, model_name: string) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("model_name", model_name);

  const res = await fetch(`${BASE_URL}/classification/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Prediction failed");
  }

  const json = await res.json();
  return json.data;
}
