import { Footer, Header } from "@/component";
import { BodyCalendar } from "@/containers";
import React, { memo } from "react";

const MemoizedHeader = memo(Header);

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <MemoizedHeader />
      <BodyCalendar />
      <Footer />
    </main>
  );
}
