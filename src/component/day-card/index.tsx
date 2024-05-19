import { DayCardProps } from "@/types";
import Image from "next/image";
import React from "react";

const DayCard: React.FC<DayCardProps> = ({
  image,
  title,
  date,
  coments,
  media_type,
}) => {
  return media_type === "image" ? (
    <Image src={image} width={500} height={500} alt="Picture of the author" />
  ) : (
    <div></div>
  );
  /*    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p>{date}</p>
      <p>{title}</p>
    </div> */
};
export default DayCard;
