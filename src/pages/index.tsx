import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center  w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Bienvenido a Nasa Calendar</h1>
        <Link href={"/app"}> Ir al calendario</Link>
      </main>
    </div>
  );
};

export default Home;
