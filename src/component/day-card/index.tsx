import { DayCardProps } from "@/types";
import Image from "next/image";
import React from "react";

const DayCard: React.FC<DayCardProps> = ({
  image,
  title,
  date,
  comments,
  media_type,
}) => {
  return (
    <div className="relative w-[250px] h-[250px] rounded-xl  cursor-pointer shadow shadow-red-500 hover:shadow-lg ">
      {media_type === "image" ? (
        <Image
          src={image}
          alt="Picture of the author"
          fill={true}
          className="rounded-xl cursor-pointer"
        />
      ) : (
        <div className="w-full h-full bg-red-500 rounded-xl"></div>
      )}
      <div className="absolute top-3 right-3">
        <p className="text-red-500 font-orbitron">{date}</p>
      </div>
      <div className="absolute bottom-2 left-2 ">
        <p className="text-red-500">{title}</p>
      </div>
    </div>
  );
};
export default DayCard;
