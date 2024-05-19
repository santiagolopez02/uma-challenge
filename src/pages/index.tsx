import React, { memo } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-2">
          <Image
            alt="log"
            src="/logos/logo.png"
            width={200}
            height={200}
            priority
          />
          <h1 className="text-24 md:text-3xl font-bold font-nasa mb-8">
            Bienvenidx a Nasa Calendar
          </h1>
          <Link href="/app" legacyBehavior>
            <a className="border-2 p-2 hover:shadow-lg">Ir al calendario</a>
          </Link>
        </main>
      </div>
    </>
  );
};

export default memo(Home);
