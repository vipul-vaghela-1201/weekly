export const isValidNumber = (value) => !Number.isNaN(Number(value));

export const validateCustomer = (customer, existingIds = []) => {
  const errors = {};
  if (!customer.id) {
    errors.id = 'Customer ID is required.';
  } else if (existingIds.includes(customer.id)) {
    errors.id = 'Customer ID must be unique.';
  }
  if (!customer.name) {
    errors.name = 'Customer name is required.';
  }
  return errors;
};

export const validateGroup = (group, existingIds = []) => {
  const errors = {};
  if (!group.id) {
    errors.id = 'Group ID is required.';
  } else if (existingIds.includes(group.id)) {
    errors.id = 'Group ID must be unique.';
  }
  if (!group.name) {
    errors.name = 'Group name is required.';
  }
  return errors;
};
