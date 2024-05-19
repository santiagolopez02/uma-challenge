import { DayCard } from "@/component";
import { apiService } from "@/models";
import ImageInterface from "@/types/image";

import { useEffect, useState } from "react";

/**
 * Function to get the range per month
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

const BodyCalendar: React.FC = () => {
  const [monthOffset, setMonthOffset] = useState<number>(0);
  const [rangeDays, setRangeDays] = useState<object>({});
  const [imageDays, setImageDays] = useState<ImageInterface[]>();

  //Set rangeDays state when loading the component or monthOffser
  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(monthOffset);
    setRangeDays({ firstDay, lastDay });
  }, [monthOffset]);

  useEffect(() => {
    if (Object.keys(rangeDays).length) {
      const fetchedData = async () => {
        const data = await apiService.getAllData("2024-05-01", "2024-05-16");
        setImageDays(data);
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
    <section>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Anterior</button>

        <button onClick={handleNextMonth}>Siguiente</button>
      </div>

      {imageDays && (
        <div className="grid grid-cols-1 px-4 gap-2">
          {imageDays?.map((item, index) => (
            <DayCard
              key={index}
              image={item.url}
              coments={item.explanation}
              date={item.date}
              title={item.title}
              media_type={item.media_type}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BodyCalendar;
