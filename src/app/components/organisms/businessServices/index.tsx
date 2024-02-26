"use client";
import styles from "./business-services.module.css";
import { ProductCard } from "../productCard";
import { Heading1 } from "../../atom/typography";
import { useProductService } from "@/app/hooks/useProduct";
import { useProductAndServicesState } from "@/app/state-management/context";
import { ProductsAndSevices } from "@/app/ts/types";
import { useEffect } from "react";

interface BusinessServicesProps {
  service: ProductsAndSevices[];
}
export const BusinessServices: React.FC<BusinessServicesProps> = ({
  service,
}) => {
  const { hanldeAdd } = useProductService();
  const [{ services }, setServices] = useProductAndServicesState();

  useEffect(() => {
    setServices((prevState) => ({ ...prevState, services: service }));
  }, [service]);
  return (
    <div className={styles["Container"]}>
      <div className={styles["Heading"]}>
        <Heading1 text="Services, Categories & Sub-Categories" />
        <span onClick={() => hanldeAdd("service")} className={styles["Add"]}>
          ADD +
        </span>
      </div>

      <div className={styles["Content"]}>
        {services?.map((service) => (
          <ProductCard key={service?._id} {...service} cardType={"service"} />
        ))}
      </div>
    </div>
  );
};
