import { DayCard } from "@/component";
import { apiService } from "@/models";
import ImageInterface from "@/types/image";
import { useEffect, useState, useCallback, memo } from "react";

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
  const [rangeDays, setRangeDays] = useState<{
    firstDay: string;
    lastDay: string;
  }>({ firstDay: "", lastDay: "" });
  const [imageDays, setImageDays] = useState<ImageInterface[]>();

  // Set rangeDays state when loading the component or monthOffset changes
  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(monthOffset);
    setRangeDays({ firstDay, lastDay });
  }, [monthOffset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getAllData(
          rangeDays.firstDay,
          rangeDays.lastDay
        );
        setImageDays(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (rangeDays.firstDay && rangeDays.lastDay) {
      fetchData();
    }
  }, [rangeDays]);

  const handlePrevMonth = useCallback(() => {
    setMonthOffset((prevOffset) => prevOffset - 1);
  }, []);

  const handleNextMonth = useCallback(() => {
    const now = new Date();
    const currentMonthOffset =
      now.getMonth() -
      new Date(now.getFullYear(), now.getMonth() + monthOffset, 1).getMonth();
    if (monthOffset < currentMonthOffset) {
      setMonthOffset((prevOffset) => prevOffset + 1);
    }
  }, [monthOffset]);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
          className="p-2 font-orbitron font-light text-white hover:text-nasa-gray-dark bg-nasa-gray-dark text-nasa-white rounded hover:bg-nasa-gray-light focus:outline-none focus:ring-2 focus:ring-nasa-black"
        >
          Anterior
        </button>

        <button
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
          className="p-2 font-orbitron font-light text-white hover:text-nasa-gray-dark bg-nasa-gray-dark text-nasa-white rounded hover:bg-nasa-gray-light focus:outline-none focus:ring-2 focus:ring-nasa-black"
        >
          Siguiente
        </button>
      </div>

      {imageDays && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {imageDays.map((item, index) => (
            <MemoizedDayCard
              key={index}
              image={item.url}
              comments={item.explanation}
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

const MemoizedDayCard = memo(DayCard);

export default BodyCalendar;
