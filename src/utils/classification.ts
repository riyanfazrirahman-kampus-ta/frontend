// utils/classification.ts
export const CLASS_COLORS: Record<string, string> = {
  lubang: "text-red-500",
  alur: "text-yellow-500",
  retak: "text-blue-500",
  default: "text-green-500",
};

export const CLASS_BG_COLORS: Record<string, string> = {
  lubang: "bg-red-500",
  alur: "bg-yellow-500",
  retak: "bg-blue-500",
  default: "bg-green-500",
};

export const CLASS_BORDERS: Record<string, string> = {
  lubang: "border-red-500",
  alur: "border-yellow-500",
  retak: "border-blue-500",
  default: "border-green-500",
};

export const CLASS_NAMES: Record<string, string> = {
  lubang: "Lubang",
  alur: "Alur",
  retak: "Retak",
  default: "Tidak Rusak",
};

export function getColor(className: string) {
  return CLASS_COLORS[className] || CLASS_COLORS.default;
}

export function getBgColor(className: string) {
  return CLASS_BG_COLORS[className] || CLASS_BG_COLORS.default;
}

export function getBorder(className: string) {
  return CLASS_BORDERS[className] || CLASS_BORDERS.default;
}

export function getClass(className: string) {
  return CLASS_NAMES[className] || CLASS_NAMES.default;
}
