/**
 * Function to get string days of week
 * @param dateString
 *
 */
export default function getDay(dateString: string): string {
  if (!dateString) return "";
  const fecha: Date = new Date(dateString);

  const nombresDias: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const numeroDia: number = fecha.getDay();

  return nombresDias[numeroDia];
}
