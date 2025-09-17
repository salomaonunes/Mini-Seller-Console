// LocalStorage utilities for persisting filter/sort settings

export const STORAGE_KEYS = {
  FILTERS: "leads-console-filters",
  SORT: "leads-console-sort",
  OPPORTUNITIES: "leads-console-opportunities",
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
    return defaultValue;
  }
};

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }
};

// Specific functions for leads console
export const saveFilters = (filters) => {
  saveToStorage(STORAGE_KEYS.FILTERS, filters);
};

export const loadFilters = () => {
  return loadFromStorage(STORAGE_KEYS.FILTERS, {
    search: "",
    status: "all",
  });
};

export const saveSort = (sort) => {
  saveToStorage(STORAGE_KEYS.SORT, sort);
};

export const loadSort = () => {
  return loadFromStorage(STORAGE_KEYS.SORT, {
    field: "score",
    direction: "desc",
  });
};

export const saveOpportunities = (opportunities) => {
  saveToStorage(STORAGE_KEYS.OPPORTUNITIES, opportunities);
};

export const loadOpportunities = () => {
  return loadFromStorage(STORAGE_KEYS.OPPORTUNITIES, []);
};
