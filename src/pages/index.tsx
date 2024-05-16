import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { HeaderContainer, BodyCalendar } from "@/containers";
import { ImageInterface } from "@/interfaces";
import { apiService } from "@/models";

export default function Page({
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("images", images);
  return (
    <main>
      <HeaderContainer />
      <BodyCalendar />
    </main>
  );
}

export const getServerSideProps = (async () => {
  let images: ImageInterface[] = await apiService.getAllData();

  return { props: { images } };
}) satisfies GetServerSideProps<{ images: ImageInterface[] }>;
