const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const getWeeklyDateRange = (baseDate = new Date()) => {
  const date = new Date(baseDate);
  const day = date.getDay();
  const diffToSaturday = (6 - day + 7) % 7;
  const reportDate = addDays(date, diffToSaturday);

  const thisWeekFriday = addDays(reportDate, -1);
  const thisWeekMonday = addDays(thisWeekFriday, -4);
  const adjustmentStart = addDays(reportDate, -7);

  const lastWeekFriday = addDays(thisWeekMonday, -3);
  const lastWeekMonday = addDays(lastWeekFriday, -4);

  return {
    reportDate,
    thisWeekMonday,
    thisWeekFriday,
    adjustmentStart,
    lastWeekMonday,
    lastWeekFriday
  };
};
