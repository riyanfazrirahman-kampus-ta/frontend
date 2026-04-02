import { useState } from "react";
import Button from "../ui/button/Button";
import ClassificationImage from "./ClassificationImage";
import DraggableMarker from "./DraggableMarker";
import { classificationImageSave } from "@/api/classificationApi";

export default function FormClassification() {
  const [file, setFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [location, setLocation] = useState({
    latitude: -2.2074064,
    longitude: 113.9152386,
    address: "",
  });

  const handleSave = async () => {
    if (!file) {
      alert("Silakan upload gambar terlebih dahulu");
      return;
    }

    if (!predictions) {
      alert("Prediksi belum tersedia");
      return;
    }

    try {
      setSaving(true);

      const res = await classificationImageSave(
        file,
        "mobilenetv2_01",
        predictions,
        location,
      );

      console.log("saved", res);
      alert("Data berhasil disimpan.");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 mb-15">
      <ClassificationImage setFile={setFile} setPredictions={setPredictions} />

      <DraggableMarker setLocation={setLocation} />

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={saving}
        size="lg"
      >
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
