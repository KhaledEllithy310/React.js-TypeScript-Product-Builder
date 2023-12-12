import { ChangeEvent, FormEvent, useState } from "react";
import { formInputList, productList } from "./Data";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMsg from "./components/ui/ErrorMsg/ErrorMsg";

export default function App() {
  //-------- STATE --------//
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const defaultError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState(defaultError);
  //-------- HANDLER --------//

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { description, imageURL, price, title } = product;
    const errors = productValidation({ description, imageURL, price, title });

    const hasErrorMes = Object.values(errors).every((error) => error === "");

    if (!hasErrorMes) {
      setErrors(errors);
      return;
    }
    setErrors(defaultError);
    console.log("Send this product to our serves");
  };

  const formCancel = () => {
    setProduct(defaultProduct);
    setErrors(defaultError);
    closeModal();
  };

  //-------- Renders --------//

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInput = formInputList.map((input) => {
    return (
      <div className="flex flex-col">
        <Input
          key={input.id}
          label={input.label}
          name={input.name}
          id={input.id}
          type={input.type}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMsg msg={errors[input.name]} />
      </div>
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
        <form className="space-y-2" onSubmit={formHandler}>
          {renderFormInput}
          <section className="flex items-center space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              submit
            </Button>
            <Button
              className="bg-neutral-400 hover:bg-neutral-500"
              onClick={formCancel}
            >
              cancel
            </Button>
          </section>
        </form>
      </Modal>
    </main>
  );
}
