/**
 * Function to get string month - year
 * @param date
 * @returns {
 *  date: string,
 * }
 */
export default function getStringMonthAndYear(date: string): string {
  if (!date) return "";
  const meses: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Cctubre",
    "Noviembre",
    "Diciembre",
  ];

  const [year, month] = date.split("-");

  return `${meses[parseInt(month) - 1]} - ${year}`;
}
