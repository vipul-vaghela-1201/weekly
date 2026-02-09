export const getWeeklyDateRange = (baseDate = new Date()) => {
  const date = new Date(baseDate);
  const day = date.getDay();
  const diffToSaturday = (6 - day + 7) % 7;
  const saturday = new Date(date);
  saturday.setDate(date.getDate() + diffToSaturday);
  const monday = new Date(saturday);
  monday.setDate(saturday.getDate() + 2);
  const friday = new Date(saturday);
  friday.setDate(saturday.getDate() + 6);
  return { saturday, monday, friday };
};
