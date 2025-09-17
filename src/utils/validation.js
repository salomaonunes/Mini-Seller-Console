// Email validation utility
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Lead validation
export const validateLead = (lead) => {
  const errors = {};

  if (!lead.name || lead.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!lead.email || lead.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!isValidEmail(lead.email)) {
    errors.email = "Invalid email format";
  }

  if (!lead.company || lead.company.trim() === "") {
    errors.company = "Company is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Opportunity validation
export const validateOpportunity = (opportunity) => {
  const errors = {};

  if (!opportunity.name || opportunity.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!opportunity.stage || opportunity.stage.trim() === "") {
    errors.stage = "Stage is required";
  }

  if (
    opportunity.amount &&
    (isNaN(opportunity.amount) || opportunity.amount < 0)
  ) {
    errors.amount = "Amount must be a positive number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
