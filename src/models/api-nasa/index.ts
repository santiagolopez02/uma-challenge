import { ApiNASAService, ImageInterface } from "@/types";
import axios, { AxiosResponse } from "axios";

/* const URL_GET_DATA = `${process.env.API_NASA_URL}?api_key=${process.env.API_NASA_TOKEN}`; */
const URL_GET_DATA = `http://localhost:8000/v1/apod?start_date=2024-05-01&end_date=2024-05-16`;

const apiService: ApiNASAService = {
  async getAllData() {
    try {
      console.log("URL_GET_DATA", URL_GET_DATA);

      const response = await axios.get<ImageInterface[]>(URL_GET_DATA);

      const images: ImageInterface[] = response.data;

      console.log("images", images);
      return images;
    } catch (error) {
      console.error("Error fetching todo list:", error);
      let errorImage: ImageInterface = {
        url: `${error}`,
        date: new Date().toISOString(),
        title: "Error fetching todo list",
        explanation: "",
      };
      return [{ ...errorImage }];
    }
  },
};

export default apiService;
