import { useState } from "react";
import { formInputList, productList } from "./Data";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";

export default function App() {
  //-------- STATE --------//
  const [isOpen, setIsOpen] = useState(false);

  //-------- HANDLER --------//
  
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  //-------- Renders --------//

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInput = formInputList.map((input) => {
    return (
      <Input
        key={input.id}
        label={input.label}
        name={input.name}
        id={input.id}
        type={input.type}
      />
    );
  });
  return (
    <main className="container">
      <section className="w-fit my-3 mx-auto ">
        <Button className="bg-indigo-600 py-1 px-5" onClick={openModal}>
          Add
        </Button>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </section>
      <Modal closeModal={closeModal} isOpen={isOpen} title=" Add a new product">
        <form className="space-y-2">
          {renderFormInput}
          <section className="flex items-center space-x-2">
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
          </section>
        </form>
      </Modal>
    </main>
  );
}
