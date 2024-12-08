import { useEffect, useRef, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>
): Size {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });

      observer.current.observe(ref.current);

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
    return undefined;
  }, [ref]);

  return size;
}
