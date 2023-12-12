import { IProductWithoutColAndCateAndId } from "../interfaces";

export const productValidation = (product: IProductWithoutColAndCateAndId) => {
  const errors: IProductWithoutColAndCateAndId = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const imageValidate = /(https?:\/\/.*\.(jpeg|jpg|gif|png|bmp|svg))$/i.test(
    product.imageURL
  );
  // title
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  )
    errors.title = "Product title must be between 10  and 80 characters";

  // description
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  )
    errors.description =
      "Product description must be between 10  and 80 characters";

  // imageURL

  if (!product.imageURL.trim() || !imageValidate)
    errors.imageURL = "Image URL is not valid";

  // price
  if (!product.price.trim() || isNaN(Number(product.price)))
    errors.price = "Product Price is not valid";

  return errors;
};
