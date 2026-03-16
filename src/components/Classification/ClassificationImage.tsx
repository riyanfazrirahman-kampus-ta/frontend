import { classificationImage } from "@/api/classificationApi";
import { useState } from "react";
import ImgDropZone from "../form/form-elements/ImgDropZone";

export default function ClassificationImage({ setFile, setPredictions }: any) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = async (file: File) => {
    setFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // langsung kirim ke backend
    await sendImage(file);
  };

  const sendImage = async (file: File) => {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_name", "jalan");

      const res = await classificationImage(file, "Model-RDC-1.1");
      setResult(res.predictions);
      setPredictions(res.predictions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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
        <div className="p-4 rounded-xl border space-y-2">
          <h3 className="font-bold">Hasil Klasifikasi</h3>

          {result.map((item: any, index: number) => (
            <div key={index} className="flex justify-between p-2 rounded">
              <span>{item.class}</span>
              <span>{item.confidence} %</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
