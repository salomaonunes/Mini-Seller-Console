import React, { useState, useEffect } from "react";
import { X, Save, DollarSign, Building, User } from "lucide-react";
import { validateOpportunity } from "../utils/validation";

const ConvertToOpportunityModal = ({
  lead,
  isOpen,
  onClose,
  onConvert,
  isConverting = false,
}) => {
  const [opportunityData, setOpportunityData] = useState({
    name: "",
    stage: "Prospecting",
    amount: "",
    accountName: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize form when lead changes
  useEffect(() => {
    if (lead && isOpen) {
      setOpportunityData({
        name: lead.name,
        stage: "Prospecting",
        amount: "",
        accountName: lead.company,
      });
      setErrors({});
    }
  }, [lead, isOpen]);

  const handleInputChange = (field, value) => {
    setOpportunityData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      ...opportunityData,
      amount: opportunityData.amount
        ? parseFloat(opportunityData.amount)
        : null,
    };

    const validation = validateOpportunity(dataToValidate);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = await onConvert(lead, {
      ...dataToValidate,
      amount: dataToValidate.amount || null,
    });

    if (result.success) {
      onClose();
    }
  };

  const stageOptions = [
    { value: "Prospecting", label: "Prospecting" },
    { value: "Qualification", label: "Qualification" },
    { value: "Proposal", label: "Proposal" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Closed Won", label: "Closed Won" },
    { value: "Closed Lost", label: "Closed Lost" },
  ];

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Convert to Opportunity
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* Opportunity Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Opportunity Name
                </label>
                <input
                  type="text"
                  value={opportunityData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`input-field ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter opportunity name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Account Name
                </label>
                <input
                  type="text"
                  value={opportunityData.accountName}
                  onChange={(e) =>
                    handleInputChange("accountName", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter account name"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stage
                </label>
                <select
                  value={opportunityData.stage}
                  onChange={(e) => handleInputChange("stage", e.target.value)}
                  className="input-field"
                >
                  {stageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Amount (Optional)
                </label>
                <input
                  type="number"
                  value={opportunityData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className={`input-field ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isConverting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isConverting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? "Converting..." : "Convert"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConvertToOpportunityModal;
