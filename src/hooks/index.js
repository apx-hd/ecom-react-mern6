import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
}

export { useFetch };
