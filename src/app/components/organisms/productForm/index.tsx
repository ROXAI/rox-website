"use client";
import { Button } from "../../atom/CTA";
import { IconText } from "../../atom/icons";
import { InputField } from "../../molecules/inputField";
import styles from "./product-form.module.css";
import { IoClose } from "react-icons/io5";
import { useProductService } from "@/app/hooks/useProduct";
import { AlertComponent } from "../../atom/alert";


export const ProductForm = () => {
  const {
    isFormOpen,
    closeForm,
    formData,
    handleStringValues,
    helperFormData,
    error,
    isDisabled,
    handleKeyAction,
    removeCategory,
    handleProductApiCall,
  } = useProductService();

  if (!isFormOpen) return;

  return (
    <div className={styles["Container"]}>
      <div className={styles["Form-Container"]}>
        <span onClick={closeForm}>
          <IoClose className={styles["Close"]} />
        </span>

        <form onSubmit={handleProductApiCall}>
          <InputField
            label="ProdutName"
            name="name"
            value={formData.name}
            onChange={handleStringValues}
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleStringValues}
          />
          <div className={styles["Categories"]}>
            <div>
              <InputField
                label="Category"
                name="categories"
                value={formData.categories}
                onChange={handleStringValues}
                onKeyDown={handleKeyAction}
              />
              <div className={styles["IconWrapper"]}>
                {helperFormData.categories.map((category, index) => (
                  <IconText
                    handler={() => removeCategory(category, "categories")}
                    key={index}
                    text={category}
                    editiable
                  />
                ))}
              </div>
            </div>

            <div>
              <InputField
                label="Sub - Categories"
                name="subCategories"
                value={formData.subCategories}
                onChange={handleStringValues}
                onKeyDown={handleKeyAction}
              />
              <div className={styles["IconWrapper"]}>
                {helperFormData.subCategories.map((subCategory, index) => (
                  <IconText
                    handler={() => removeCategory(subCategory, "subCategories")}
                    key={index}
                    text={subCategory}
                    editiable
                  />
                ))}
              </div>
            </div>
          </div>

          <Button text="send" type="submit" disabled={isDisabled} />
          {error && <AlertComponent errorMessage={error} />}
        </form>
      </div>
    </div>
  );
};
