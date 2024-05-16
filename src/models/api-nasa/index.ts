import { ApiNASAService, ImageInterface } from "@/interfaces";
import axios, { AxiosResponse } from "axios";

const URL_GET_DATA = `${process.env.API_NASA_URL}?api_key=${process.env.API_NASA_TOKEN}`;

const apiService: ApiNASAService = {
  async getAllData() {
    try {
      console.log("URL_GET_DATA", URL_GET_DATA);
      const response: AxiosResponse<ImageInterface[]> = await axios.get<
        ImageInterface[]
      >(URL_GET_DATA);
      return response.data;
    } catch (error) {
      console.error("Error fetching todo list:", error);
      let errorImage: ImageInterface = {
        data: `${error}`,
        date: new Date().toISOString(),
        title: "Error fetching todo list",
      };
      return [{ ...errorImage }];
    }
  },
};

export default apiService;
