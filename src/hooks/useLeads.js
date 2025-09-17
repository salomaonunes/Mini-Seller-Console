import { useState, useEffect, useCallback } from "react";
import { loadLeads, updateLead } from "../services/leadsService";
import {
  loadFilters,
  saveFilters,
  loadSort,
  saveSort,
} from "../utils/localStorage";

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(loadFilters());
  const [sort, setSort] = useState(loadSort());

  // Load leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);

      const result = await loadLeads();

      if (result.success) {
        setLeads(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    fetchLeads();
  }, []);

  // Filter and sort leads
  useEffect(() => {
    let filtered = [...leads];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm) ||
          lead.company.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (sort.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLeads(filtered);
  }, [leads, filters, sort]);

  // Update filters
  const updateFilters = useCallback(
    (newFilters) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      saveFilters(updatedFilters);
    },
    [filters]
  );

  // Update sort
  const updateSort = useCallback((newSort) => {
    setSort(newSort);
    saveSort(newSort);
  }, []);

  // Update lead
  const updateLeadData = useCallback(async (leadId, updates) => {
    const result = await updateLead(leadId, updates);

    if (result.success) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, ...updates } : lead
        )
      );
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  }, []);

  return {
    leads: filteredLeads,
    allLeads: leads,
    loading,
    error,
    filters,
    sort,
    updateFilters,
    updateSort,
    updateLeadData,
  };
};
