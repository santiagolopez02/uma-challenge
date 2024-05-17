import { DayCard } from "@/component";
import { apiService } from "@/models";
import { ImageInterface } from "@/types";
import axios from "axios";

import { useEffect, useState } from "react";

/**
 * Función para obtener el rango por mes
 * @param offset
 * @returns {
 * lastDay: string,
 * firstDay: string
 * }
 */
function getFirstAndLastDayOfMonth(offset: number = 0): {
  firstDay: string;
  lastDay: string;
} {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const firstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);

  // Si es el mes actual, devuelvo el último día transcurrido
  let lastDay;
  if (offset === 0) {
    lastDay = now;
  } else {
    lastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
  }

  const firstDayFormatted = firstDay.toISOString().split("T")[0];
  const lastDayFormatted = lastDay.toISOString().split("T")[0];

  return { firstDay: firstDayFormatted, lastDay: lastDayFormatted };
}
const URL_GET_DATA = `http://localhost:8000/v1/apod?start_date=2024-05-01&end_date=2024-05-16`;
const BodyCalendar: React.FC = () => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [rangeDays, setRangeDays] = useState({});
  const [imageDays, setImageDays] = useState([]);

  //Se setea el rango de fechas cuando carga el componente o monthOffser
  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(monthOffset);
    setRangeDays({ firstDay, lastDay });
  }, [monthOffset]);

  useEffect(() => {
    if (Object.keys(rangeDays).length) {
      const fetchedData = async () => {
        const data = await apiService.getAllData();
        console.log("data", data);
      };

      fetchedData();
    }
  }, [rangeDays]);

  const handlePrevMonth = () => {
    setMonthOffset(monthOffset - 1);
  };
  const handleNextMonth = () => {
    const now = new Date();
    const currentMonthOffset =
      now.getMonth() -
      new Date(now.getFullYear(), now.getMonth() + monthOffset, 1).getMonth();
    if (monthOffset < currentMonthOffset) {
      setMonthOffset(monthOffset + 1);
    }
  };

  return (
    <>
      <div>
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Anterior</button>

          <button onClick={handleNextMonth}>Siguiente</button>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default BodyCalendar;
