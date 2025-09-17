import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  RotateCcw,
  Mail,
  Building,
  Star,
  User,
  ExternalLink,
} from "lucide-react";
import { validateLead } from "../utils/validation";
import LoadingSpinner from "./LoadingSpinner";

const LeadDetailPanel = ({
  lead,
  isOpen,
  onClose,
  onSave,
  onConvertToOpportunity,
  isConverting = false,
}) => {
  const [editedLead, setEditedLead] = useState(lead);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState(null);

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(false);
      setErrors({});
      setSaveError(null);
    }
  }, [lead]);

  const handleInputChange = (field, value) => {
    setEditedLead((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSave = async () => {
    const validation = validateLead(editedLead);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    const result = await onSave(editedLead.id, {
      name: editedLead.name,
      email: editedLead.email,
      company: editedLead.company,
      status: editedLead.status,
    });

    if (result.success) {
      setIsEditing(false);
      setErrors({});
    } else {
      setSaveError(result.error);
    }

    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
    setErrors({});
    setSaveError(null);
  };

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

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Lead Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editedLead.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`input-field ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{lead.name}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editedLead.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className={`input-field ${
                        errors.company ? "border-red-500" : ""
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.company}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{lead.company}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      value={editedLead.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`input-field ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{lead.email}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                {isEditing ? (
                  <select
                    value={editedLead.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                )}
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <p className="text-gray-900">{lead.source}</p>
              </div>

              {/* Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Score
                </label>
                <div className="flex items-center">
                  <Star
                    className={`w-5 h-5 mr-2 ${getScoreColor(lead.score)}`}
                  />
                  <span
                    className={`text-lg font-semibold ${getScoreColor(
                      lead.score
                    )}`}
                  >
                    {lead.score}
                  </span>
                </div>
              </div>

              {/* Save Error */}
              {saveError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{saveError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex flex-col gap-3">
              {/* Convert to Opportunity Button */}
              <button
                onClick={() => onConvertToOpportunity(lead)}
                disabled={isConverting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {isConverting ? "Converting..." : "Convert to Opportunity"}
              </button>

              {/* Edit/Save/Cancel Buttons */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary"
                >
                  Edit Lead
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPanel;
