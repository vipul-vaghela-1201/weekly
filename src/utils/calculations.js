export const calculateCustomerBalance = (customer, settings = {}) => {
  const lastWeek = Number(customer.lastWeekBalance || 0);
  const thisWeekBusinessCustomerView = Number(customer.thisWeekBusiness || 0);
  const adjustments = Number(customer.adjustments || 0);
  let balance = lastWeek + adjustments - thisWeekBusinessCustomerView;

  let depositUsed = 0;
  let creditAddedToDeposit = Number(customer.creditAddedToDeposit || 0);
  const baseDeposit = Number(customer.deposit || 0) + Number(customer.materialDeposit || 0);
  let deposit = baseDeposit;

  if (customer.useDeposit && balance < 0) {
    const maxUsage = settings.enablePartialDeposit
      ? Number(customer.partialDepositAmount || 0)
      : Math.abs(balance);
    depositUsed = Math.min(deposit, Math.abs(balance), maxUsage);
    balance += depositUsed;
    deposit -= depositUsed;
  }

  if (customer.addToDeposit && balance > 0) {
    creditAddedToDeposit = balance;
    deposit += balance;
    balance = 0;
  }

  const overpaymentAmount = customer.overpaymentToDeposit && balance > 0 ? balance : 0;
  if (overpaymentAmount > 0) {
    deposit += overpaymentAmount;
    balance = 0;
  }

  return {
    balance,
    deposit,
    depositUsed,
    creditAddedToDeposit,
    overpaymentAmount
  };
};

export const recalculateGroup = (group, customers) => {
  const members = customers.filter((customer) => group.members.includes(customer.id));
  const totals = members.reduce(
    (acc, member) => {
      acc.lastWeekBalance += Number(member.lastWeekBalance || 0);
      acc.thisWeekBusiness += Number(member.thisWeekBusiness || 0);
      acc.adjustments += Number(member.adjustments || 0);
      acc.deposit += Number(member.deposit || 0);
      acc.materialDeposit += Number(member.materialDeposit || 0);
      acc.newBalance += Number(member.newBalance || 0);
      return acc;
    },
    {
      lastWeekBalance: 0,
      thisWeekBusiness: 0,
      adjustments: 0,
      deposit: 0,
      materialDeposit: 0,
      newBalance: 0
    }
  );

  return {
    ...group,
    name: group.name,
    totals,
    memberCount: members.length
  };
};

export const updateKeywordGroupMembers = (group, customers) => {
  if (!group.keyword) return group;
  const keyword = group.keyword.toLowerCase();
  const members = customers
    .filter((customer) => customer.name.toLowerCase().includes(keyword))
    .map((customer) => customer.id);
  return {
    ...group,
    members
  };
};

export const generateFinalReport = (customers) =>
  customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    newBalance: customer.newBalance,
    deposit: customer.deposit
  }));
