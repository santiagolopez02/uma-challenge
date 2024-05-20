import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full">
      <Image alt="header" src="/logos/nasa.png" width={200} height={200} />
    </header>
  );
};
export default Header;
