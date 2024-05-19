import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-end">
      <Image alt="header" src="/logos/footer2.png" width={200} height={200} />
    </footer>
  );
};
export default Footer;
