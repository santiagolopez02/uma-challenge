import { ApiNASAService } from "@/types";
import ImageInterface from "@/types/image";
import axios from "axios";

const apiService: ApiNASAService = {
  async getAllData(start_date: string, end_date: string) {
    const URL_GET_DATA = `${process.env.NEXT_PUBLIC_API_NASA_URL}?api_key=${process.env.NEXT_PUBLIC_API_NASA_TOKEN}&start_date=${start_date}&end_date=${end_date}`;

    try {
      console.log("URL_GET_DATA", URL_GET_DATA);
      const response = await axios.get<ImageInterface[]>(URL_GET_DATA);

      const images: ImageInterface[] = response.data.map(
        ({ url, date, title, explanation, media_type }) => ({
          url,
          date,
          title,
          explanation,
          media_type,
        })
      );

      console.log("images", images);
      return images;
    } catch (error) {
      console.error("Error fetching data from NASA API", error);
      throw new Error("Failed to fetch data from NASA API");
    }
  },
};

export default apiService;
