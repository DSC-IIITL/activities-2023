import { useEffect, useState } from "react";

export default function useFetch(...props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const f = (...p) => {
    setLoading(true);
    (p.length > 0 ? fetch(...p) : fetch(...props))
      .then((res) => {
        if (!res.ok) throw new Error(res);
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) setData(null);
  }, [error]);

  useEffect(() => {
    if (data) setError(null);
  }, [data]);

  return {
    loading,
    data,
    error,
    fetch: f,
  };
}
