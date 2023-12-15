import { IProduct } from "../../interfaces";
import { textSlice } from "../../utilts/Functions";
import Button from "../ui/Button/Button";
import Image from "../ui/Image/Image";

interface IProductCardProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openIsConfirmModal: () => void;
  setProductDeletedId: (id: string | undefined) => void;
}
const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  openIsConfirmModal,
  setProductDeletedId,
}: IProductCardProps) => {
  const { imageURL, title, description, category, price, colors } = product;
  //-------- HANDLER --------//
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
  };
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <div>
        {" "}
        <Image
          imageURL={imageURL}
          alt={"Product Name"}
          className="rounded-md h-52 w-full lg:object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold truncate">{textSlice(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words truncate">
        {textSlice(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1">
        {colors.length > 0 ? (
          colors
            .slice(0, 8)
            .map((color) => (
              <span
                key={color}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
            ))
        ) : (
          <p className="text-sm font-semibold">Not Available colors</p>
        )}
        <p className="h-5">{colors.length > 8 && `+${colors.length - 8}`}</p>
      </div>
      <div className="flex justify-between items-center">
        <strong className="text-indigo-600">${price}</strong>
        <div className="flex items-center gap-2">
          <p className="text-sm text-indigo-600 font-semibold">
            {category.name}
          </p>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-600" onClick={onEdit}>
          edit
        </Button>
        <Button
          className="bg-red-600"
          // onClick={() => removeProduct(product.id)}
          onClick={() => {
            openIsConfirmModal();
            setProductDeletedId(product.id);
          }}
        >
          remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
