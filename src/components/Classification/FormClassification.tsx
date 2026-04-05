import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import ClassificationImage from "./ClassificationImage";
import DraggableMarker from "./DraggableMarker";
import { classificationImageSave, fetchStatus } from "@/api/classificationApi";
import { useClassificationModel } from "@/context/ClassificationModelContext";

export default function FormClassification() {
  const [file, setFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [modelLoading, setModelLoading] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const { selectedModel, setSelectedModel } = useClassificationModel();

  const [showSuccess, setShowSuccess] = useState(false);

  const defaultLocation = {
    latitude: -2.2074064,
    longitude: 113.9152386,
    address: "",
  };

  const [location, setLocation] = useState(defaultLocation);

  const resetForm = () => {
    setFile(null);
    setPredictions(null);
    setLocation(defaultLocation);
  };

  const checkModelStatus = async () => {
    try {
      setModelLoading(true);

      const status = await fetchStatus();

      setModelReady(status === "ok");
    } catch (err) {
      console.error(err);
      setModelReady(false);
    } finally {
      setModelLoading(false);
    }
  };

  useEffect(() => {
    checkModelStatus();
  }, []);

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
        selectedModel,
        predictions,
        location,
      );

      console.log("saved", res);

      // tampilkan modal sukses
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
    window.location.reload(); // cara paling cepat
  };

  return (
    <div className="space-y-4 mb-15">
      {showSuccess && (
        <div className="fixed inset-0 z-99999 h-screen flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Berhasil
            </h2>

            <p className="mb-5 text-sm text-gray-600">
              Data berhasil disimpan.
            </p>

            <Button className="w-full" onClick={handleCloseSuccess}>
              Tutup
            </Button>
          </div>
        </div>
      )}

      {modelLoading ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
          <p className="text-sm text-gray-500">Model sedang dicek...</p>
        </div>
      ) : !modelReady ? (
        <div className="rounded-xl border border-yellow-300 dark:border-gray-800  bg-yellow-50 dark:bg-gray-900 p-6 text-center space-y-3">
          <p className="text-sm text-yellow-700 dark:text-slate-200">
            Model belum aktif. Klik refresh untuk mencoba lagi.
          </p>

          <Button onClick={checkModelStatus} size="sm" variant="outline">
            Refresh
          </Button>
        </div>
      ) : (
        <>
          <ClassificationImage
            file={file}
            setFile={setFile}
            setPredictions={setPredictions}
          />
        </>
      )}

      <DraggableMarker location={location} setLocation={setLocation} />

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={modelReady ? saving : true}
        size="md"
      >
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
