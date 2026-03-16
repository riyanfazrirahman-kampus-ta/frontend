import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useClassificationHistory } from "../../../hooks/useClassificationHistory";
import Badge from "../../ui/badge/Badge";

export default function BasicTableOne() {
  const { data, loading } = useClassificationHistory();
  if (loading) return <div className="p-5">Loading...</div>;
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
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
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
                  <Badge
                    size="sm"
                    color={
                      item.predictions[0].class === "lubang"
                        ? "error"
                        : item.predictions[0].class === "alur"
                          ? "warning"
                          : item.predictions[0].class === "retak"
                            ? "success"
                            : "info"
                    }
                  >
                    {item.predictions[0].class}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
