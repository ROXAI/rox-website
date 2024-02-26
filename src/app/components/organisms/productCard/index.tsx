import { ProductsAndSevices } from "@/app/ts/types";
import { IconText } from "../../atom/icons";
import { Paragraph, Title } from "../../atom/typography";
import styles from "./product-card.module.css";
import commonStyles from "@/app/common_styles/pop-over.module.css"

import { useProductService } from "@/app/hooks/useProduct";
import { SimplePopper } from "../../atom/popOver";

interface ProductCardTypes extends ProductsAndSevices {
  cardType: "product" | "service";
}
export const ProductCard: React.FC<ProductCardTypes> = ({
  _id,
  description,
  name,
  categories,
  subCategories,
  cardType,
}) => {
  const { handleUpdate, handleDelete } = useProductService();
  return (
    <div className={styles["Card"]}>
      <div className={styles["Edit"]}>
        <SimplePopper>
          <div className={commonStyles["PopOverContainer"]}>
            <div
              className={commonStyles["PopOverItem"]}
              onClick={() => handleUpdate(cardType, _id)}
            >
              edit
            </div>
            <div
              className={commonStyles["PopOverItem"]}
              onClick={() => handleDelete(cardType, _id)}
            >
              delete
            </div>
          </div>
        </SimplePopper>
      </div>

      <Title text={name} />
      <Paragraph text={description} />

      <div className={styles["IconTextWrapper"]}>
        {categories?.map((category, index) => (
          <IconText key={index} text={category} />
        ))}
        {subCategories?.map((category, index) => (
          <IconText key={index} text={category} />
        ))}
      </div>
    </div>
  );
};
