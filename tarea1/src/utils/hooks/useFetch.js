import { useState, useEffect } from "react";

export default url => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        // Revisar si hay otra pagina
        var newPage = null;
        var newJson = null;
        var next = json.info && json.info.next ? json.info.next : null;
        while (next) {
          newPage = await fetch(next);
          newJson = await newPage.json();
          json.results = json.results.concat(newJson.results);
          next = newJson.next;
        }
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { response, error };
};
