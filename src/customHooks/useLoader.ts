import { useState, useEffect } from "react";

export function useLoader<T>(fetchFunction: () => Promise<T>, delay: number) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadData = () => {
      if (delay !== 0) {
        setLoading(true);
        setData(null);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await fetchFunction();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }, delay);
    };

    loadData();
    return () => clearTimeout(timeoutId);
  }, [fetchFunction]);

  return { data, loading };
}

export default useLoader;
