import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Video from "../video";
import Comment from "@/types/comment";
import apiCommentService from "@/models/api-comment";
const ModalComponent: React.FC<ModalProps> = ({
  id_img,
  title,
  date,
  url,
  state,
  media_type,
  setState,
}) => {
  const [commentsUsers, setCommentsUsers] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const cache = useRef<{ [key: string]: Comment[] }>({});

  const fetchData = useCallback(async (id_img: string) => {
    try {
      if (!cache.current[id_img]) {
        const data = await apiCommentService.getAllDataById(id_img);

        cache.current[id_img] = data;
        setCommentsUsers(data);
      } else {
        setCommentsUsers(cache.current[id_img]);
      }
    } catch (error) {
      console.error("Error fetchData ", error);
    }
  }, []);

  useEffect(() => {
    if (id_img) {
      fetchData(id_img);
    }
  }, [id_img, fetchData]);

  const handleSave = async () => {
    try {
      const response = await apiCommentService.create(id_img, inputValue);

      setCommentsUsers([...commentsUsers, response]);
      setInputValue("");
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-65 data-[state=open]:animate-overlayShow fixed inset-0 " />
        <Dialog.Content className=" data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] lg:max-w-screen-lg overflow-y-scroll max-h-screen h-auto w-auto translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="font-nasa m-0 text-[17px] font-medium gap-2">
            <span>{title}</span>
            <span>{date}</span>
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 flex flex-col items-center ">
            {media_type === "image" && (
              <Link href={url} target="_blank" className="cursor-pointer">
                <Image
                  alt={title}
                  src={url}
                  layout="responsive"
                  width={500}
                  height={500}
                />
              </Link>
            )}
            {media_type === "video" && (
              <div className="w-full h-full bg-nasa-gray-dark rounded-xl flex flex-col justify-center items-center text-white">
                <Video url={url} />
              </div>
            )}
          </Dialog.Description>
          <Dialog.Description className="w-full font-nasa">
            Comentarios:
          </Dialog.Description>

          <div className="w-full font-nasa h-[80px] overflow-y-auto">
            {commentsUsers?.length
              ? commentsUsers.map((comment) => (
                  <Dialog.Description key={comment.id} className="border-b-2">
                    - {comment.comment}
                  </Dialog.Description>
                ))
              : null}
          </div>

          <fieldset className="mb-[15px] flex items-center gap-5 mt-2">
            <input
              type="text"
              required
              className="text-nasa shadow-nasa-gray-dark focus:shadow-nasa-gray-light inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="comment"
              placeholder="Agrega un comentario..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <button
              title="Guardar"
              aria-label="Guardar"
              type="button"
              name="save"
              onClick={handleSave}
              className="bg-white text-nasa-gray-dark hover:bg-nasa-gray-light focus:shadow-red-950 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Guardar
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              title="Close"
              name="Close"
              type="button"
              className="text-black hover:bg-black hover:text-nasa-gray-light focus:shadow-black absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalComponent;
