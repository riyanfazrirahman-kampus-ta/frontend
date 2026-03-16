import { useEffect, useState } from "react";
import {
  ClassificationData,
  fetchClassificationHistory,
} from "../api/classificationApi";

export function useClassificationHistory() {
  const [data, setData] = useState<ClassificationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassificationHistory()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
