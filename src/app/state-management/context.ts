import {
  AuthData,
  BusinessProductAndServices,
  UserBusinessInfoTypes,
  UserProfile,
} from "@/app/ts/types";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

const ProductAndServices = atom<BusinessProductAndServices>({
  key: uuidv4(),
  default: {
    products: [
      {
        _id: uuidv4(),
        name: "",
        description: "",
        categories: [""],
        subCategories: [""],
      },
    ],
    services: [
      {
        _id: uuidv4(),
        name: "",
        description: "",
        categories: [""],
        subCategories: [""],
      },
    ],
    // items: [
    //   {
    //     _id: uuidv4(),
    //     name: "",
    //     description: "",
    //     categories: [],
    //     subCategories: [],
    //   },
    // ],
  },
});

const UserProfile = atom<UserProfile>({
  key: uuidv4(),
  default: {
    _id: "",
    uid: "",
    email: "",
    firstName: "",
  },
});

const BusinessProfile = atom<UserBusinessInfoTypes>({
  key: uuidv4(),
  default: {
    currentSelection: {
      _id: "",
      businessName: "",
      profileId: {
        _id: "",
        email: ""
      },
      description: "",
    },
    businessInfoData: [],
  },
});

export const userBusinessInfoState = () =>
  useRecoilState<UserBusinessInfoTypes>(BusinessProfile);

export const useProductAndServicesState = () =>
  useRecoilState(ProductAndServices);
export const useProductAndServicesValue = () =>
  useRecoilValue(ProductAndServices);

const Login = atom<Partial<AuthData>>({
  key: uuidv4(),
  default: {},
});

export const useAuthDataState = () => useRecoilState(Login);
export const useAuthDataValue = () => useRecoilValue(Login);
