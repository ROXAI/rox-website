import { apiQuery } from "@/helpers/api_query";
import { Products } from ".";
import { apiRoutes } from "@/data/routes";
import { serverErrorLogger } from "@/helpers/logger";

export const getProducts = async () => {
  const apiQueryData = apiQuery();
  const productsUrl = apiRoutes.userBusiness.getProducts;
  const product = await apiQueryData(`${productsUrl}`);

  const products = await product.json();
  if (!product.ok) serverErrorLogger("PRODUCT_FETCH", products.error.message);

  return products;
};

export const ProductListing = async () => {
  const products = await getProducts();
  return <Products product={products?.data} />;
};
