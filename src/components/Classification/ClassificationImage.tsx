import {
  classificationImage,
  fetchModelsAvalible,
} from "@/api/classificationApi";
import { useClassificationModel } from "@/context/ClassificationModelContext";
import { useEffect, useState } from "react";
import ImgDropZone from "../form/form-elements/ImgDropZone";
import Select from "../form/Select";

export default function ClassificationImage({ setFile, setPredictions }: any) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [models, setModels] = useState<string[]>([]);
  const { selectedModel, setSelectedModel } = useClassificationModel();

  const modelOptions = models.map((model) => ({
    value: model,
    label: model,
  }));

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await fetchModelsAvalible();

        // jika API return array object: [{ model_name: "Model-RDC-1.1" }]
        const mapped = data.map((item: any) => item.model_name || item);

        setModels(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    loadModels();
  }, []);

  const sendImage = async (file: File, model: string) => {
    try {
      setLoading(true);
      setResult(null);

      const res = await classificationImage(file, model);

      setResult(res.predictions);
      setPredictions(res.predictions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setCurrentFile(file);
    setFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    await sendImage(file, selectedModel);
  };

  // Jika model diganti, prediksi ulang otomatis menggunakan gambar yang sama
  useEffect(() => {
    if (currentFile) {
      sendImage(currentFile, selectedModel);
    }
  }, [selectedModel]);

  return (
    <div className="space-y-4">
      <Select
        options={modelOptions}
        defaultValue={selectedModel}
        placeholder="Pilih Model"
        onChange={(value) => setSelectedModel(value)}
        className="dark:bg-dark-900 bg-white"
      />

      <ImgDropZone
        onFileSelect={handleFileSelect}
        currentImage={previewUrl || undefined}
      />

      {/* Loading */}
      {loading && (
        <div className="p-4 rounded-xl border text-center">
          ⏳ Memproses klasifikasi...
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 rounded-xl border space-y-2 bg-blue-100 dark:bg-slate-800">
          <h3 className="font-bold text-center">Hasil Klasifikasi</h3>

          {result
            .filter((item: any) => item.confidence > 0)
            .map((item: any, index: number) => (
              <div
                key={index}
                className={`flex justify-between rounded-2xl px-5 py-2
                bg-white text-black dark:bg-slate-700 dark:text-white
                ${index === 0 ? "border-2 border-blue-400 dark:border-blue-300" : ""}
              `}
              >
                <span>{item.class}</span>
                <span>{item.confidence} %</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
