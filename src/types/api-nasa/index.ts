import ImageInterface from "../image";

export default interface ApiNASAService {
  getAllData: (
    start_date: string,
    end_date: string
  ) => Promise<ImageInterface[]>;
}
