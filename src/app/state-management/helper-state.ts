import { atom, useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { FormActionType, FormType } from "../ts/types";
import { ContentType, adContent } from "../ts/interface";
import { ReactNode } from "react";

interface ActionsType {
  productFormAction: boolean;
  businessFormAction: boolean;
  generateContentFormAction: boolean;
  productFormActionType: FormActionType;
  formType: FormType;
  generateContentStatus: "loading" | "completed" | "Inactive"| "error";
}

const Actions = atom<ActionsType>({
  key: uuidv4(),
  default: {
    productFormAction: false,
    businessFormAction: false,
    generateContentFormAction: false,
    productFormActionType: "add",
    formType: "product",
    generateContentStatus: "completed",
  },
});

const loadSpinner = atom({
  key: uuidv4(),
  default: false,
});

const businessData = atom({
  key: uuidv4(),
  default: {
    _id: "",
    businessName: "",
    description: "",
  },
});

const productOrserviceData = atom({
  key: uuidv4(),
  default: {
    name: "",
    description: "",
    categories: "",
    subCategories: "",
  },
});

const categoryAndSubcategoryList = atom({
  key: uuidv4(),
  default: {
    categories: [],
    subCategories: [],
  },
});

type ProductAndServiceActionTypes = "add" | "remove" | "update";
const ProductServiceAction = atom<ProductAndServiceActionTypes>({
  key: uuidv4(),
  default: "add",
});

const contentGenerationProperties = atom<ContentType>({
  key: uuidv4(),
  default: {
    tone: "",
    products: [],
    services: [],
    adQuantity: 0,
  },
});

interface ContentGenComponents {
  component: ReactNode;
}

const contentGenComponents = atom<ContentGenComponents>({
  key: uuidv4(),
  default: {
    component: null,
  },
});

const editAdContent = atom({
  key: uuidv4(),
  default: {
    _id: "",
    text: "",
  },
});

export const useEditAdContentState = () => useRecoilState(editAdContent);
export const useContentGenComponents = () =>
  useRecoilState(contentGenComponents);

export const useContentGenerationState = () =>
  useRecoilState(contentGenerationProperties);

export const useProductServiceAction = () =>
  useRecoilState(ProductServiceAction);

export const useProductServiceForm = () => useRecoilState(productOrserviceData);
export const useCategoryAndSubcategoryFormList = () =>
  useRecoilState(categoryAndSubcategoryList);

export const useBusinessProfileState = () => useRecoilState(businessData);
export const useLoadSpinnerState = () => useRecoilState(loadSpinner);

export const useActionState = () => useRecoilState(Actions);
export const useActionValue = () => useRecoilValue(Actions);

const selectedAds = atom<adContent[]>({
  key: uuidv4(),
  default: [],
});
export const useSelectedAds = () => useRecoilState(selectedAds)