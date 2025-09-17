import { useState, useEffect, useCallback } from "react";
import { convertToOpportunity } from "../services/leadsService";
import { loadOpportunities, saveOpportunities } from "../utils/localStorage";

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load opportunities from localStorage on mount
  useEffect(() => {
    const savedOpportunities = loadOpportunities();
    setOpportunities(savedOpportunities);
  }, []);

  // Save opportunities to localStorage whenever they change
  useEffect(() => {
    saveOpportunities(opportunities);
  }, [opportunities]);

  // Convert lead to opportunity
  const convertLead = useCallback(async (lead, opportunityData = {}) => {
    setLoading(true);
    setError(null);

    const result = await convertToOpportunity(lead, opportunityData);

    if (result.success) {
      setOpportunities((prev) => [...prev, result.data]);
      setLoading(false);
      return { success: true, opportunity: result.data };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    opportunities,
    loading,
    error,
    convertLead,
    clearError,
  };
};
