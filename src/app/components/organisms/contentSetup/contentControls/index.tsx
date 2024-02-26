"use client";
import { useGenerateContent } from "@/app/hooks/generateContent";
import styles from "./content-control.module.css";
import { Popper } from "@mui/base";
import React from "react";
import { MainButton } from "@/app/components/atom/CTA";
import {
  SelectProducts,
  SelectServices,
  SelectTone,
} from "../../popupContainer";
export const ContentControl = () => {
  const {
    setComponent,
    selectedProperties,
    isDisabled,
    hanleGenerateContentApiCall,
  } = useGenerateContent();
  const { tone, products, services } = selectedProperties;

  const product = products.length
    ? "products - " + products.length
    : " select - products";

  const service = services.length
    ? "services - " + services.length
    : " select - services";

  const tones = tone ? "tone - " + selectedProperties.tone : "set - tone";
  return (
    <>
      <div className={styles["Content"]}>
        <div className={styles["Content-item1"]}>
          <SelectBtn
            handler={() => setComponent(<SelectTone />)}
            text={tones}
          />
          <SelectBtn
            handler={() => setComponent(<SelectProducts />)}
            text={product}
          />
          <SelectBtn
            handler={() => setComponent(<SelectServices />)}
            text={service}
          />
          <SelectQuatity />
        </div>

        <div>
          <MainButton
            type="button"
            size="small"
            text="send"
            disabled={isDisabled}
            handler={hanleGenerateContentApiCall}
          />
        </div>
      </div>
    </>
  );
};

type SelectBtnProps = {
  text: string;
  handler: () => void;
};
const SelectBtn: React.FC<SelectBtnProps> = ({ text, handler }) => {
  return (
    <>
      <button onClick={handler} className={styles["ButtonStyle"]}>
        {text}
      </button>
    </>
  );
};

export const SelectQuatity = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleQuatity, selectedProperties, isDisabled } =
    useGenerateContent();
  const { adQuantity } = selectedProperties;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const adQty = adQuantity ? "adQuantity - " + adQuantity : "set - adQuantity";
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <button
        onClick={handleClick}
        className={styles["ButtonStyle"]}
        type="button"
        aria-describedby={id}
      >
        {adQty}
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={styles["PopOverContainer"]}>
          <button
            type="button"
            className={styles["PopOverItem"]}
            onClick={() => handleQuatity("add")}
          >
            +
          </button>
          <span className={styles["PopOverItem-span"]}>
            {selectedProperties?.adQuantity}
          </span>
          <button
            type="button"
            className={styles["PopOverItem"]}
            onClick={() => handleQuatity("remove")}
          >
            -
          </button>
        </div>
      </Popper>
    </>
  );
};
