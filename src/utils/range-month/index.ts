/**
 * Function to get the range per month
 * @param offset
 * @returns {
 * lastDay: string,
 * firstDay: string
 * }
 */
export default function getFirstAndLastDayOfMonth(offset: number = 0): {
  firstDay: string;
  lastDay: string;
} {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const targetMonth = currentMonth + offset;
  const targetDate = new Date(currentYear, targetMonth, 1);

  const firstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
  const firstDayFormatted = firstDay.toISOString().split("T")[0];

  const lastDay =
    offset === 0
      ? now
      : new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
  const lastDayFormatted = lastDay.toISOString().split("T")[0];

  return { firstDay: firstDayFormatted, lastDay: lastDayFormatted };
}
