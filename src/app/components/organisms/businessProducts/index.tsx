"use client";
import { useProductService } from "@/app/hooks/useProduct";
import { Heading1 } from "../../atom/typography";
import { ProductCard } from "../productCard";
import styles from "./business-product.module.css";
import React, { useEffect } from "react";
import { useProductAndServicesState } from "@/app/state-management/context";
import { ProductsAndSevices } from "@/app/ts/types";

interface Products {
  product: ProductsAndSevices[];
}

export const Products: React.FC<Products> = ({ product }) => {
  const { hanldeAdd } = useProductService();
  const [{products}, setProducts] = useProductAndServicesState();

  useEffect(() => {
    setProducts((prevState) => ({ ...prevState, products: products }));
  }, [product]);
  return (
    <div className={styles["Container"]}>
      <div className={styles["Heading"]}>
        <Heading1 text="Product, Categories & Sub-Categories" />
        <span onClick={() => hanldeAdd("product")} className={styles["Add"]}>
          ADD +
        </span>
      </div>

      <div className={styles["Content"]}>
        {products?.map((product) => (
          <ProductCard key={product?._id} {...product} cardType={"product"} />
        ))}
      </div>
    </div>
  );
};
