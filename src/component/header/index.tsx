import { HeaderProps } from "@/types";
import React from "react";

const Header: React.FC<HeaderProps> = ({ image }) => {
  return <header>{image}</header>;
};
export default Header;
