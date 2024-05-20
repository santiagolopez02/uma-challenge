import { ErrorMessageProps } from "@/types";
import React from "react";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="text-nasa-red font-semibold text-xs">{message}</p>;
};

export default React.memo(ErrorMessage);
