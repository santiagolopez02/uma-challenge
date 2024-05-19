import React, { lazy, Suspense } from "react";

const LazyHeader = lazy(() => import("@/component/header"));
const LazyBodyCalendar = lazy(() => import("@/containers/body-calendar"));

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Suspense fallback={<div>Cargando...</div>}>
        <LazyHeader />
      </Suspense>

      <Suspense fallback={<div>Cargando...</div>}>
        <LazyBodyCalendar />
      </Suspense>
    </main>
  );
}
