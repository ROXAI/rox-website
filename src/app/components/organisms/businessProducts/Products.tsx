import { apiQuery } from "@/helpers/api_query";
import { Products } from ".";
import { apiRoutes } from "@/data/routes";
import { ApplicationIdKeys } from "@/app/ts/enums";
import { serverErrorLogger } from "@/helpers/logger";

export const getProducts = async () => {
  const apiQueryData = apiQuery();
  const productsUrl = apiRoutes.userBusiness.getProducts;
  const businessId = process.env.USER_BUSINESS || "";
  const product = await apiQueryData(
    `${productsUrl}?${ApplicationIdKeys.BUSINESS_ID}=${businessId}`
  );

  const products = await product.json();
  if (!product.ok) serverErrorLogger("PRODUCT_FETCH", products.error.message);

  return products;
};

export const ProductListing = async () => {
  const products = await getProducts();
  return <Products product={products?.data} />;
};
