import ImageInterface from "../image";

export default interface ApiNASAService {
  getAllData: () => Promise<ImageInterface[]>;
}
