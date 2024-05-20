import { ErrorMessageProps } from "@/types";
import React from "react";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className="text-nasa-red font-semibold text-[7px] md:text-[10px]">
      {message}
    </p>
  );
};

export default React.memo(ErrorMessage);
