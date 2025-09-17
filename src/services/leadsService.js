// Service for handling leads data operations

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Load leads from JSON file
export const loadLeads = async () => {
  try {
    // Simulate network delay
    await delay(800);

    const response = await fetch("/data/leads.json");
    if (!response.ok) {
      throw new Error("Failed to load leads");
    }

    const leads = await response.json();
    return { success: true, data: leads };
  } catch (error) {
    console.error("Error loading leads:", error);
    return { success: false, error: error.message };
  }
};

// Update lead
export const updateLead = async (leadId, updates) => {
  try {
    // Simulate network delay
    await delay(500);

    // Simulate random failure (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Simulated network error");
    }

    return { success: true, data: { id: leadId, ...updates } };
  } catch (error) {
    console.error("Error updating lead:", error);
    return { success: false, error: error.message };
  }
};

// Convert lead to opportunity
export const convertToOpportunity = async (lead, opportunityData) => {
  try {
    // Simulate network delay
    await delay(600);

    // Simulate random failure (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Simulated conversion error");
    }

    const opportunity = {
      id: Date.now(), // Simple ID generation
      name: opportunityData.name || lead.name,
      stage: opportunityData.stage || "Prospecting",
      amount: opportunityData.amount || null,
      accountName: opportunityData.accountName || lead.company,
      leadId: lead.id,
      createdAt: new Date().toISOString(),
    };

    return { success: true, data: opportunity };
  } catch (error) {
    console.error("Error converting lead:", error);
    return { success: false, error: error.message };
  }
};
