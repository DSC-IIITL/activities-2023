import { useRef } from "react";

/**
 * @param {() => void} callback
 * @param {number} timeout
 */
export default function useDebouce(callback, timeout = 2000) {
  const isWaitingRef = useRef(null);

  const debouncedCallback = () => {
    if (isWaitingRef !== null) clearTimeout(isWaitingRef.current);
    isWaitingRef.current = setTimeout(() => {
      callback();
    }, timeout);
  };

  return {
    callback: debouncedCallback,
    fire: () => {
      clearTimeout(isWaitingRef.current);
      isWaitingRef.current = null;
      callback();
    },
  };
}
