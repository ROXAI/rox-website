"use client";
import { useGenerateContent } from "@/app/hooks/generateContent";
import styles from "./popupcontainer.module.css";
import { IoClose } from "react-icons/io5";
import { Heading1 } from "../../atom/typography";
import { generateContentData } from "@/data";
import { Button } from "../../atom/CTA";
import { useProductAndServicesValue } from "@/app/state-management/context";

export const ContentGeneratorPopUp = () => {
  const { formStatus, componentSettings, toggleForm } = useGenerateContent();
  if (!formStatus) return;
  return (
    <div className={styles["Container"]}>
      <div className={styles["Form-Container"]}>
        <span onClick={toggleForm}>
          <IoClose className={styles["Close"]} />
        </span>

        <div>{componentSettings.component}</div>
      </div>
    </div>
  );
};


export const SelectServices = () => {
  const { services } = useProductAndServicesValue();
  const { toggleForm, handleSelectServices, selectedProperties } =
    useGenerateContent();
  const { services: selectedServices } = selectedProperties;
  return (
    <div>
      <div>
        <Heading1 text="Select Your Services for Customized Ad Creation" />
        <p className={styles["ParagraphText"]}>
          Handpick services for personalized ad creation. Your selections define
          tailored ads showcasing your expertise. Choose now to create
          compelling content!
        </p>
      </div>

      <div>
        <form>
          {services?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectServices(item._id)} // Pass the selected tone
              className={`${styles["RadioGroup-Container"]} ${
                selectedServices.includes(item._id) ? styles["selected"] : ""
              }`}
            >
              <input
                type="radio"
                id={item._id} // Use unique IDs for radio inputs
                name={item.name}
                checked={selectedServices.includes(item._id)}
                readOnly
              />
              <div>
                <label className={styles["Radio-label"]} htmlFor={item.name}>
                  {item.name}
                </label>
                <p className={styles["Radio-Desc"]}>{item.description}</p>
              </div>
            </div>
          ))}
          <Button type="button" text="OK" handler={toggleForm} />
        </form>
      </div>
    </div>
  );
};

export const SelectProducts = () => {
  const { products } = useProductAndServicesValue();
  const { toggleForm, handleSelectProducts, selectedProperties } =
    useGenerateContent();
  const { products: selectedProduct } = selectedProperties;
  return (
    <div>
      <div>
        <Heading1 text="Select Your Products for Tailored Ad Creation" />
        <p className={styles["ParagraphText"]}>
          Curate ads reflecting your brand. Pick items; our AI tailors
          compelling content. Define your brand, witness personalized ad magic!
        </p>
      </div>

      <div>
        <form>
          {products?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectProducts(item._id)} // Pass the selected tone
              className={`${styles["RadioGroup-Container"]} ${
                selectedProduct.includes(item._id) ? styles["selected"] : ""
              }`}
            >
              <input
                type="radio"
                id={item._id} // Use unique IDs for radio inputs
                name={item.name}
                checked={selectedProduct.includes(item._id)}
                readOnly
              />
              <div>
                <label className={styles["Radio-label"]} htmlFor={item.name}>
                  {item.name}
                </label>
                <p className={styles["Radio-Desc"]}>{item.description}</p>
              </div>
            </div>
          ))}
          <Button type="button" text="OK" handler={toggleForm} />
        </form>
      </div>
    </div>
  );
};

export const SelectTone = () => {
  const { toggleForm, handleSelectTone, selectedProperties } =
    useGenerateContent();
  const { tone: selectedTone } = selectedProperties;
  return (
    <div>
      <div>
        <Heading1 text="Craft the Perfect Voice for Your Brand" />
        <p className={styles["ParagraphText"]}>
          Pick your perfect ad tone. From energetic to soothing, let our AI
          tailor your message to win hearts and clicks.
        </p>
      </div>

      <div>
        <form>
          {generateContentData.adTones.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectTone(item)} // Pass the selected tone
              className={`${styles["RadioGroup-Container"]} ${
                selectedTone === item.title ? styles["selected"] : ""
              }`}
            >
              <input
                type="radio"
                id={item.id} // Use unique IDs for radio inputs
                name="adTone"
                checked={selectedTone === item.title}
                readOnly
              />
              <div>
                <label className={styles["Radio-label"]} htmlFor={item.title}>
                  {item.title}
                </label>
                <p className={styles["Radio-Desc"]}>{item.description}</p>
              </div>
            </div>
          ))}
          <Button type="button" text="OK" handler={toggleForm} />
        </form>
      </div>
    </div>
  );
};
