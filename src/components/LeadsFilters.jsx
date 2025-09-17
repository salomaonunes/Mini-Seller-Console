import React from "react";
import { Search, Filter } from "lucide-react";

const LeadsFilters = ({ filters, onFiltersChange, sort, onSortChange }) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "New", label: "New" },
    { value: "Contacted", label: "Contacted" },
    { value: "Qualified", label: "Qualified" },
  ];

  const sortOptions = [
    { value: "score", label: "Score" },
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "status", label: "Status" },
  ];

  return (
    <div className="bg-white p-3 sm:p-4 border-b border-gray-200">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="input-field pl-10 w-full"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
          {/* Status Filter */}
          <div className="flex-1 xs:flex-none xs:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filters.status}
                onChange={(e) => onFiltersChange({ status: e.target.value })}
                className="input-field pl-10 appearance-none w-full"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="flex-1 xs:flex-none xs:w-48">
            <div className="flex gap-2">
              <select
                value={sort.field}
                onChange={(e) =>
                  onSortChange({ ...sort, field: e.target.value })
                }
                className="input-field flex-1 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    <span className="hidden sm:inline">Sort by </span>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  onSortChange({
                    ...sort,
                    direction: sort.direction === "asc" ? "desc" : "asc",
                  })
                }
                className="btn-secondary px-3 min-w-[44px] flex items-center justify-center"
                title={`Sort ${
                  sort.direction === "asc" ? "Descending" : "Ascending"
                }`}
              >
                {sort.direction === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsFilters;
