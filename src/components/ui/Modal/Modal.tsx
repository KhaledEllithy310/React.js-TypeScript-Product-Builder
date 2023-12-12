import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button/Button";

interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}
export default function Modal({ isOpen, closeModal, title }: IModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="capitalize text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="flex items-center space-x-2 mt-3">
                    <Button
                      type="button"
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={closeModal}
                    >
                      submit
                    </Button>
                    <Button
                      type="button"
                      className="bg-neutral-400 hover:bg-neutral-500"
                      onClick={closeModal}
                    >
                      cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
