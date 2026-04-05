import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ClassificationSummaryProps {
  data: {
    model: string;
    id: string;
    image: {
      url: string;
      format?: string;
    };
    predictions: {
      class: string;
    }[];
  }[];
}

export default function ClassificationSummary({
  data,
}: ClassificationSummaryProps) {
  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();

      for (const item of data) {
        const modelName = item.model || "lainnya";
        const predictionClass = item.predictions[0]?.class || "lainnya";

        const folder = zip.folder(
          `riwayat-klasifikasi/${modelName}/${predictionClass}`,
        );

        const response = await fetch(item.image.url);
        const blob = await response.blob();

        const extension = item.image.format?.split("/")[1] || "jpg";

        folder?.file(`${item.id}.${extension}`, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "riwayat-klasifikasi.zip");
    } catch (error) {
      console.error(error);
      alert("Gagal download seluruh gambar");
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 pt-4 lg:px-8 lg:pt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total:{" "}
        </span>

        <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
          {data.length} data
        </span>
      </div>

      <button
        onClick={handleDownloadAll}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-medium text-white hover:bg-brand-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6a.5.5 0 0 1 1 0v2.6A2 2 0 0 1 14 15H2a2 2 0 0 1-2-2v-2.6a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 10.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.293V1.5a.5.5 0 0 0-1 0v7.793L5.354 7.146a.5.5 0 1 0-.708.708z" />
        </svg>
        Download Semua Gambar
      </button>
    </div>
  );
}
