import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalProps } from "@/types";
import Image from "next/image";

import Link from "next/link";
const ModalComponent: React.FC<ModalProps> = ({
  title,
  comments,
  date,
  image,
  state,
  setState,
}) => {
  return (
    <Dialog.Root open={state} onOpenChange={setState} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-65 data-[state=open]:animate-overlayShow fixed inset-0 " />
        <Dialog.Content className=" data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] lg:max-w-screen-lg overflow-y-scroll max-h-screen h-auto  w-auto translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="font-nasa m-0 text-[17px] font-medium gap-2">
            <span>{title}</span>
            <span>{date}</span>
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 flex flex-col items-center ">
            <Link href={image} target="_blank" className="cursor-pointer">
              <Image
                alt={title}
                src={image}
                layout="responsive"
                width={500}
                height={500}
              />
            </Link>
          </Dialog.Description>
          <Dialog.Description className="mt-[10px] mb-5 w-full  h-[80px] overflow-y-auto">
            <span>{comments}</span>
          </Dialog.Description>

          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="font-nasa w-[90px] text-right text-[15px]"
              htmlFor="comment"
            >
              Comentario:
            </label>
            <input
              type="text"
              className="text-nasa shadow-nasa-gray-dark focus:shadow-nasa-gray-light inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="comment"
              placeholder="Agrega un comentario..."
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <button
              title="Guardar"
              aria-label="Guardar"
              type="button"
              name="save"
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
