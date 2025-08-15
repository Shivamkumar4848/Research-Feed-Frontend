import { useEffect, useState } from "react";

const STORAGE_KEY = "rf_filters_v1";

export default function useFilters(
  defaults = { tags: [], categories: [], startDate: "", endDate: "" }
) {
  const [filters, setFilters] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return saved || defaults;
    } catch {
      return defaults;
    }
  });

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  return { filters, updateFilters };
}
