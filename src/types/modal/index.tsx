export default interface ModalProps {
  id_img: string;
  url: string;
  title: string;
  date: string;
  state: boolean;
  media_type: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
