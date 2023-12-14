import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { categories, colors, formInputList, productList } from "./Data";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMsg from "./components/ui/ErrorMsg/ErrorMsg";
import CircleColor from "./components/ui/CircleColor/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select/Select";

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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState(defaultError);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  //-------- HANDLER --------//

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);

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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const formCancel = () => {
    setProduct(defaultProduct);
    setErrors(defaultError);
    closeModal();
  };
  const formEditCancel = () => {
    setProduct(defaultProduct);
    setErrors(defaultError);
    closeEditModal();
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

    if (tempColors.length > 0) {
      setProducts((prev) => [
        {
          ...product,
          id: uuid(),
          colors: tempColors,
          category: selectedCategory,
        },
        ...prev,
      ]);
      setErrors(defaultError);
      setProduct(defaultProduct);
      setTempColors([]);
      closeModal();
    }
  };

  const formEditHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log("Sssss");

    e.preventDefault();
    const { description, imageURL, price, title } = productToEdit;
    const errors = productValidation({ description, imageURL, price, title });

    const hasErrorMes = Object.values(errors).every((error) => error === "");

    if (!hasErrorMes) {
      setErrors(errors);
      return;
    }
    const targetProductIndex = products.findIndex(
      (product) => product.id === productToEdit.id
    );

    const updatedProducts = [...products];
    updatedProducts[targetProductIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    // if (tempColors.length > 0) {
    // setProducts((prev) => [
    //   {
    //     ...product,
    //     id: uuid(),
    //     colors: tempColors,
    //     category: selectedCategory,
    //   },
    //   ...prev,
    // ]);

    // setErrors(defaultError);
    // setProduct(defaultProduct);
    // setTempColors([]);
    closeEditModal();
    // }
  };

  const colorsHandlers = (e: MouseEvent<HTMLSpanElement>, color: string) => {
    const target = e.target as HTMLElement; // Typecast e.target as HTMLElement
    const classList = target.classList;

    if (tempColors.includes(color) || productToEdit.colors.includes(color)) {
      setTempColors((prev) => prev.filter((item) => item !== color));
      productToEdit.colors.splice(productToEdit.colors.indexOf(color), 1);
      classList.remove("outline", "outline-2", "outline-black");
    } else {
      setTempColors((prev) => [...prev, color]);
      classList.add("outline", "outline-2", "outline-black");
    }
  };

  //-------- Renders --------//

  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
    />
  ));

  const renderEditFormInput = formInputList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col">
        <Input
          label={input.label}
          name={input.name}
          id={input.id}
          type={input.type}
          value={productToEdit[input.name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[input.name]} />
      </div>
    );
  });
  const renderFormInput = formInputList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col">
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

  const renderProductColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={(e) => colorsHandlers(e, color)}
    />
  ));

  return (
    <main className="container">
      <section className="w-fit my-3 mx-auto">
        <Button className="bg-indigo-600 py-1 px-5" onClick={openModal}>
          Add
        </Button>
      </section>
      <section className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </section>
      {/* Add Product Modal */}
      <Modal
        closeModal={closeEditModal}
        isOpen={isOpen}
        title=" Add a new product"
      >
        <form className="space-y-2" onSubmit={formHandler}>
          {renderFormInput}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-1 ">
            {renderProductColor}
          </div>

          <div className="flex items-center flex-wrap space-x-1 ">
            {tempColors.map((renderedColor) => (
              <span
                key={renderedColor}
                className="rounded text-white text-xs px-1 mb-1 first-of-type:ml-1"
                style={{ backgroundColor: renderedColor }}
              >
                {renderedColor}
              </span>
            ))}
          </div>
          <section className="flex items-center space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              submit
            </Button>
            <Button
              className="bg-neutral-400 hover:bg-neutral-500"
              type="button"
              onClick={formCancel}
            >
              cancel
            </Button>
          </section>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        closeModal={closeModal}
        isOpen={isOpenEditModal}
        title=" Edit This product"
      >
        <form className="space-y-2" onSubmit={formEditHandler}>
          {renderEditFormInput}

          {/* Select Component */}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1 ">
            {renderProductColor}
          </div>

          <div className="flex items-center flex-wrap space-x-1 ">
            {tempColors.concat(productToEdit.colors).map((renderedColor) => (
              <span
                key={renderedColor}
                className="rounded text-white text-xs px-1 mb-1 first-of-type:ml-1"
                style={{ backgroundColor: renderedColor }}
              >
                {renderedColor}
              </span>
            ))}
          </div>
          <section className="flex items-center space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              submit
            </Button>
            <Button
              className="bg-neutral-400 hover:bg-neutral-500"
              type="button"
              onClick={formEditCancel}
            >
              cancel
            </Button>
          </section>
        </form>
      </Modal>
    </main>
  );
}
