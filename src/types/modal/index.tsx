export default interface ModalProps {
  image: string;
  title: string;
  date: string;
  comments: string[];

  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
