import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useClassificationHistory } from "../../hooks/useClassificationHistory";
import { deleteClassification } from "@/api/classificationApi";

export default function TabelClassification() {
  const { data, loading } = useClassificationHistory();
  if (loading) return <div className="p-5">Loading...</div>;
  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Belum ada riwayat klasifikasi
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");

    if (!confirmDelete) return;

    try {
      await deleteClassification(id);

      window.location.reload(); // cara paling cepat
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Hasil
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={item.image.url}
                        alt={item.image.format}
                      />
                    </div>
                    <div>
                      <span
                        className={`"block font-medium ${
                          item.predictions[0].class === "lubang"
                            ? "text-red-500"
                            : item.predictions[0].class === "alur"
                              ? "text-yellow-500"
                              : item.predictions[0].class === "retak"
                                ? "text-blue-500"
                                : "text-green-500"
                        } text-theme-sm dark:text-white/90"`}
                      >
                        {item.predictions[0].class} ({" "}
                        {item.predictions[0].confidence} %)
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.location.address}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button onClick={() => handleDelete(item.id)}>
                    <span className="text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
