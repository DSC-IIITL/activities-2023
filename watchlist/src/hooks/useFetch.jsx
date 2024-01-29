import { useCallback, useState } from "react";

export default function useFetch(...props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const f = useCallback(
    (...p) => {
      setLoading(true);
      (p ? fetch(...p) : fetch(...props))
        .then((res) => {
          if (!res.ok) throw new Error(res);
          return res.json();
        })
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    },
    [props]
  );

  return {
    loading,
    data,
    error,
    fetch: f,
  };
}
