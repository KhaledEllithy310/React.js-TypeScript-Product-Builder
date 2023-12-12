import { useState } from "react";
import { productList } from "./Data";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import Button from "./components/ui/Button/Button";

export default function App() {
  //** Renders

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <main className="container">
      <Button className="bg-indigo-600" onClick={openModal}>
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal closeModal={cl oseModal} isOpen={isOpen} title="add product" />
    </main>
  );
}
