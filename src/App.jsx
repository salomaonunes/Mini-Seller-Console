import React, { useState } from "react";
import { useLeads } from "./hooks/useLeads";
import { useOpportunities } from "./hooks/useOpportunities";
import LeadsFilters from "./components/LeadsFilters";
import LeadsList from "./components/LeadsList";
import LeadDetailPanel from "./components/LeadDetailPanel";
import ConvertToOpportunityModal from "./components/ConvertToOpportunityModal";
import OpportunitiesList from "./components/OpportunitiesList";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import { Users, Briefcase } from "lucide-react";

function App() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("leads");

  const {
    leads,
    loading: leadsLoading,
    error: leadsError,
    filters,
    sort,
    updateFilters,
    updateSort,
    updateLeadData,
  } = useLeads();

  const {
    opportunities,
    loading: opportunitiesLoading,
    error: opportunitiesError,
    convertLead,
    clearError: clearOpportunitiesError,
  } = useOpportunities();

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedLead(null);
  };

  const handleSaveLead = async (leadId, updates) => {
    return await updateLeadData(leadId, updates);
  };

  const handleConvertToOpportunity = (lead) => {
    setSelectedLead(lead);
    setIsConvertModalOpen(true);
  };

  const handleCloseConvertModal = () => {
    setIsConvertModalOpen(false);
    setSelectedLead(null);
  };

  const handleConvert = async (lead, opportunityData) => {
    const result = await convertLead(lead, opportunityData);
    if (result.success) {
      setIsConvertModalOpen(false);
      setSelectedLead(null);
    }
    return result;
  };

  const handleRetryLeads = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Mini Seller Console
              </h1>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "leads"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "opportunities"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-2" />
                Opportunities ({opportunities.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "leads" ? (
          <div className="space-y-6">
            {/* Leads Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Filters */}
              <LeadsFilters
                filters={filters}
                onFiltersChange={updateFilters}
                sort={sort}
                onSortChange={updateSort}
              />

              {/* Content */}
              <div className="h-96">
                {leadsLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : leadsError ? (
                  <ErrorState
                    title="Failed to load leads"
                    message={leadsError}
                    onRetry={handleRetryLeads}
                  />
                ) : leads.length === 0 ? (
                  <EmptyState
                    title="No leads found"
                    description="Try adjusting your search or filter criteria."
                    icon={Users}
                  />
                ) : (
                  <LeadsList
                    leads={leads}
                    onLeadSelect={handleLeadSelect}
                    selectedLeadId={selectedLead?.id}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Opportunities Section */}
            {opportunitiesLoading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : opportunitiesError ? (
              <ErrorState
                title="Failed to load opportunities"
                message={opportunitiesError}
                onRetry={clearOpportunitiesError}
              />
            ) : (
              <OpportunitiesList opportunities={opportunities} />
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <LeadDetailPanel
        lead={selectedLead}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetailPanel}
        onSave={handleSaveLead}
        onConvertToOpportunity={handleConvertToOpportunity}
      />

      <ConvertToOpportunityModal
        lead={selectedLead}
        isOpen={isConvertModalOpen}
        onClose={handleCloseConvertModal}
        onConvert={handleConvert}
        isConverting={opportunitiesLoading}
      />
    </div>
  );
}

export default App;
