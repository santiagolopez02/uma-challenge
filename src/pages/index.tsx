import React, { memo } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-2">
        <Image alt="log" src="/logos/logo.png" width={200} height={200} />
        <h1 className="text-6xl font-bold font-orbitron mb-8">
          Bienvenido a Nasa Calendar
        </h1>
        <Link href="/app">
          <span className="border-2 p-2 hover:shadow-lg">Ir al calendario</span>
        </Link>
      </main>
    </div>
  );
};

export default memo(Home);
