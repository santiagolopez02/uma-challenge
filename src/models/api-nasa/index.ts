import { ApiNASAService } from "@/types";
import ImageInterface from "@/types/image";
import getNameImage from "@/utils/get-name-image";
import axios from "axios";

const apiService: ApiNASAService = {
  async getAllData(start_date: string, end_date: string) {
    const URL_GET_DATA = `${process.env.NEXT_PUBLIC_API_NASA_URL}?api_key=${process.env.NEXT_PUBLIC_API_NASA_TOKEN}&start_date=${start_date}&end_date=${end_date}`;

    try {
      const response = await axios.get<ImageInterface[]>(URL_GET_DATA);

      const images: ImageInterface[] = response.data.map(
        ({ url, date, title, explanation, media_type }) => ({
          id_img: getNameImage(url),
          url,
          date,
          title,
          explanation,
          media_type,
        })
      );

      return images;
    } catch (error) {
      throw new Error("Failed to fetch data from NASA API");
    }
  },
};

export default apiService;
