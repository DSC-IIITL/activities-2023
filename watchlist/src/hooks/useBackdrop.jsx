import { useCallback, useEffect, useRef } from "react";

/**
 * @param {boolean} open
 * @param {(open: boolean) => void} setOpen
 */
export default function useBackdrop(open, setOpen) {
  const ref = useRef(null);

  const handleBlur = useCallback(
    (ev) => {
      if (!ref.current.contains(ev.target)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleBlur);
    } else {
      document.removeEventListener("click", handleBlur);
    }
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [handleBlur, open]);

  return { ref };
}
