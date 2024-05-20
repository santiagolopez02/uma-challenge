/**
 * Function to get string days of week
 * @param dateString
 *
 */
export default function getDay(dateString: string): string {
  if (!dateString) return "";
  const date: Date = new Date(dateString);

  const nameDays: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const numberDay: number = date.getDay();

  return nameDays[numberDay];
}
