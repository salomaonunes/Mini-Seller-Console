import React from "react";
import { DollarSign, Calendar, Building, User } from "lucide-react";

const OpportunitiesList = ({ opportunities }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case "Prospecting":
        return "bg-blue-100 text-blue-800";
      case "Qualification":
        return "bg-yellow-100 text-yellow-800";
      case "Proposal":
        return "bg-purple-100 text-purple-800";
      case "Negotiation":
        return "bg-orange-100 text-orange-800";
      case "Closed Won":
        return "bg-green-100 text-green-800";
      case "Closed Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No opportunities yet
          </h3>
          <p className="text-gray-500">
            Convert leads to opportunities to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Opportunities ({opportunities.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">
                    {opportunity.name}
                  </h4>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                      opportunity.stage
                    )}`}
                  >
                    {opportunity.stage}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span>{opportunity.accountName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">
                      {formatCurrency(opportunity.amount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Created {formatDate(opportunity.createdAt)}</span>
                  </div>

                  {opportunity.leadId && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>From Lead #{opportunity.leadId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesList;
