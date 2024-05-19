import React, {
  useState,
  useCallback,
  lazy,
  Suspense,
  startTransition,
} from "react";
import { DayCardProps } from "@/types";
import Image from "next/image";
import TooltipComponent from "../tooltip";
import getDay from "@/utils/get-day";

const ModalComponent = lazy(() => import("@/component/modal"));

const DayCard: React.FC<DayCardProps> = ({
  image,
  title,
  date,
  comments,
  media_type,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    startTransition(() => {
      setOpen(true);
    });
  }, []);
  const dayOfWeek: string = getDay(date);
  return (
    <>
      <div
        className="relative w-[250px] h-[250px] rounded-xl cursor-pointer shadow hover:shadow-md hover:shadow-nasa-gray-warm-dark"
        onClick={handleOpen}
      >
        {media_type === "image" && (
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-xl opacity-85 hover:opacity-100"
            priority
          />
        )}
        {media_type === "video" && (
          <div className="w-full h-full bg-nasa-gray-warm-dark rounded-xl"></div>
        )}

        <div className="absolute top-0 right-3">
          <p className="text-nasa-red font-nasa underline font-semibold ">
            {dayOfWeek}
          </p>
        </div>
        <div className="absolute top-6 right-3">
          <div className="flex flex-row gap-2 justify-start">
            <TooltipComponent content={comments} name={title} />
            <p className="text-white font-nasa ">{date}</p>
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <p className="text-white font-nasa">{title}</p>
        </div>
      </div>
      {open && (
        <Suspense fallback={<div>Cargando...</div>}>
          <ModalComponent
            comments={[comments]}
            date={date}
            image={image}
            state={open}
            title={title}
            setState={setOpen}
          />
        </Suspense>
      )}
    </>
  );
};

export default React.memo(DayCard);
