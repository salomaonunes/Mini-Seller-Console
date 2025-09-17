import React from "react";
import { Mail, Building, Star, Eye } from "lucide-react";

const LeadsList = ({ leads, onLeadSelect, selectedLeadId }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Qualified":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  if (leads.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No leads found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Desktop Table View */}
      <div className="hidden md:block min-w-full">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-2">Status</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => onLeadSelect(lead)}
              className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                selectedLeadId === lead.id
                  ? "bg-primary-50 border-r-4 border-primary-500"
                  : ""
              }`}
            >
              <div className="col-span-3">
                <div className="font-medium text-gray-900">{lead.name}</div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                  {lead.company}
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{lead.email}</span>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-gray-600">{lead.source}</span>
              </div>

              <div className="col-span-1">
                <div className="flex items-center">
                  <Star
                    className={`w-4 h-4 mr-1 ${getScoreColor(lead.score)}`}
                  />
                  <span className={`font-medium ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </span>
                </div>
              </div>

              <div className="col-span-2">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => onLeadSelect(lead)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                selectedLeadId === lead.id
                  ? "bg-primary-50 border-l-4 border-primary-500"
                  : ""
              }`}
            >
              {/* Header with Name and Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {lead.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {lead.company}
                  </p>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{lead.source}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Star
                      className={`w-4 h-4 mr-1 ${getScoreColor(lead.score)}`}
                    />
                    <span
                      className={`font-medium ${getScoreColor(lead.score)}`}
                    >
                      {lead.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadsList;
