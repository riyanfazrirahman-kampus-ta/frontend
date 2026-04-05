import { useState } from "react";
import { createPortal } from "react-dom";

interface PreviewImageProps {
  src: string;
  alt?: string;
  className?: string;
  header?: string; // prop baru untuk header
}

export default function PreviewImage({
  src,
  alt,
  className = "",
  header,
}: PreviewImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block overflow-hidden ${className}`}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative flex h-[60vh] w-[80vw] lg:h-[80vh]  max-w-5xl flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              {header && (
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-[#000]">
                  <span className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {header}
                  </span>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg text-black dark:bg-gray-700 dark:text-white"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
