import { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`h-full w-full overflow-hidden ${className}`}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative flex h-screen w-screen flex-col overflow-hidden bg-white dark:bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              {header && (
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-slate-950">
                  <span className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {header}
                  </span>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center overflow-hidden p-4"
              >
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
