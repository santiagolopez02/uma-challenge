import React, {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from "react";
import { apiService } from "@/models";
import ImageInterface from "@/types/image";
import getStringMonthAndYear from "@/utils/month-year";
import getFirstAndLastDayOfMonth from "@/utils/range-month";
import { ErrorMessage } from "@/component";

const LazyDayCard = lazy(() => import("@/component/day-card"));

const BodyCalendar: React.FC<any> = () => {
  /**
   *
   * States
   *
   */
  const [monthOffset, setMonthOffset] = useState<number>(0);
  const [monthYear, setMonthYear] = useState<string>("");
  const [rangeDays, setRangeDays] = useState<{
    firstDay: string;
    lastDay: string;
  }>({ firstDay: "", lastDay: "" });
  const [imageDays, setImageDays] = useState<ImageInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  const cache = useRef<{ [key: string]: ImageInterface[] }>({});

  /**
   *
   * Function to update the range state by monthOffset
   *
   */
  const updateRangeDays = useCallback((offset: number) => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(offset);
    setMonthYear(getStringMonthAndYear(firstDay));
    setRangeDays({ firstDay, lastDay });
  }, []);

  useEffect(() => {
    updateRangeDays(monthOffset);
  }, [monthOffset, updateRangeDays]);

  /**
   *
   *  Function to fetch image from API and cache
   *
   */
  const fetchData = useCallback(async (firstDay: string, lastDay: string) => {
    setLoading(true);
    const rangeKey = `${firstDay}-${lastDay}`;
    try {
      if (!cache.current[rangeKey]) {
        const data = await apiService.getAllData(firstDay, lastDay);
        cache.current[rangeKey] = data;
        setImageDays(data);
      } else {
        setImageDays(cache.current[rangeKey]);
      }
    } catch (error) {
      setError("Error al cargar las imagenes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rangeDays.firstDay && rangeDays.lastDay) {
      fetchData(rangeDays.firstDay, rangeDays.lastDay);
    }
  }, [rangeDays, fetchData]);

  useEffect(() => {
    const now = new Date();
    const currentMonthOffset =
      now.getMonth() -
      new Date(now.getFullYear(), now.getMonth() + monthOffset, 1).getMonth();
    setIsCurrentMonth(monthOffset >= currentMonthOffset);
  }, [monthOffset]);

  /**
   * Callback to handle click for prev month button
   *
   */
  const handlePrevMonth = useCallback(() => {
    setMonthOffset((prevOffset) => prevOffset - 1);
  }, []);

  /**
   * Callback to handle click for next month button
   *
   */
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
    <section className="w-full flex flex-col justify-center items-center py-4">
      <div className="flex flex-row justify-center items-center space-x-4 mb-4">
        <button
          name="prev"
          type="button"
          title="prevMonth"
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
          className="disabled:cursor-not-allowed p-2 font-nasa font-light text-white  bg-nasa-gray-dark  rounded hover:bg-nasa-gray-light"
          disabled={loading}
        >
          {"<"}
        </button>
        <p className="font-nasa text-24 font-bold">{monthYear}</p>
        <button
          name="next"
          type="button"
          title="nextMonth"
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
          className="disabled:cursor-not-allowed p-2 font-nasa font-light text-white  bg-nasa-gray-dark  rounded hover:bg-nasa-gray-light"
          disabled={loading || isCurrentMonth}
        >
          {">"}
        </button>
      </div>
      {loading ? (
        <div>Cargando calendario...</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {imageDays &&
            imageDays.map((item, index) => (
              <Suspense key={index} fallback={<div>...</div>}>
                <LazyDayCard
                  id_img={item.id_img}
                  url={item.url}
                  comment={item.explanation}
                  date={item.date}
                  title={item.title}
                  media_type={item.media_type}
                />
              </Suspense>
            ))}
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default BodyCalendar;
