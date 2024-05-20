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
  id_img,
  url,
  title,
  date,
  comment,
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
        data-testid="daycard"
        className="relative w-[250px] h-[250px] rounded-xl cursor-pointer shadow hover:shadow-md hover:shadow-nasa-gray-warm-dark"
        onClick={handleOpen}
      >
        {media_type === "image" && (
          <Image
            src={url}
            alt={title}
            fill
            className="rounded-xl opacity-85 hover:opacity-100"
          />
        )}
        {media_type === "video" && (
          <div className="w-full h-full bg-nasa-gray-dark rounded-xl flex flex-col justify-center items-center text-white">
            Video
          </div>
        )}

        <div className="absolute top-0 right-3">
          <p className="text-nasa-red font-nasa underline font-semibold ">
            {dayOfWeek}
          </p>
        </div>
        <div className="absolute top-6 right-3">
          <div className="flex flex-row gap-2 justify-start">
            <TooltipComponent content={comment} name={title} />
            <p className="text-white font-nasa ">{date}</p>
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <p className="text-white font-nasa">{title}</p>
        </div>
      </div>
      {open && (
        <Suspense fallback={<div></div>}>
          <ModalComponent
            id_img={id_img}
            media_type={media_type}
            date={date}
            url={url}
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
