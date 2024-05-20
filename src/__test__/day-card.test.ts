import DayCard from "@/component/day-card";
import { DayCardProps } from "@/types";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

describe("DayCard component ", () => {
  const defaultProps: DayCardProps = {
    id_img: "1",
    url: "/image.jpg",
    title: "Test",
    date: "2022-05-20",
    comment: "Test",
    media_type: "image",
  };

  test("Render component DayCard", async () => {
    /*  render(
      <DayCard
        id_img={defaultProps.id_img}
        url={defaultProps.url}
        title={defaultProps.title}
        date={defaultProps.date}
        comment={defaultProps.comment}
        media_type={defaultProps.media_type}
      />
    );
    const div = await screen.findByTestId("daycard");

    expect(div).toBeInTheDocument(); */
  });
});
