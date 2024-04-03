import { ChangeEvent, KeyboardEvent, FormEvent } from "react";
import {
  useActionState,
  useCategoryAndSubcategoryFormList,
  useLoadSpinnerState,
  useProductServiceAction,
  useProductServiceForm,
} from "../state-management/helper-state";
import { useAlertHook } from "./alertHook";
import { apiRoutes } from "@/data/routes";
import axios from "axios";

import {
  useProductAndServicesState,
  userBusinessInfoState,
} from "../state-management/context";
import { useRouter } from "next/navigation";
import { FormActionType, FormType, ProductsAndSevices } from "../ts/types";
import { ApplicationIdKeys } from "../ts/enums";

export const useProductService = () => {
  const [{ currentSelection }] = userBusinessInfoState();
  const { error, setError, isDisabled, clientErrorHandler, setIsDisabled } =
    useAlertHook();

  const [{ productFormAction, formType }, setFormAction] = useActionState();
  const [{ products, services }, setProductsAndServices] =
    useProductAndServicesState();

  const [ProductServiceAction, setProductServiceAction] =
    useProductServiceAction();

  const [formData, setFormData] = useProductServiceForm();
  const router = useRouter();
  const [helperFormData, setHelperFormData] =
    useCategoryAndSubcategoryFormList();

  const [_, setLoadSpinner] = useLoadSpinnerState();

  const handleStringValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleKeyAction = (e: KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (e.key === "Enter") {
      e.preventDefault();
      setHelperFormData((prevState: any) => {
        return { ...prevState, [name]: [...prevState[name], value] };
      });
      setFormData((prevState) => {
        return { ...prevState, [name]: "" };
      });
    }
  };

  const hanldeAdd = (type: FormType) => {
    setFormData({
      name: "",
      description: "",
      categories: "",
      subCategories: "",
    });
    setHelperFormData({
      categories: [],
      subCategories: [],
    });
    setProductServiceAction("add");
    setFormAction((prevState) => {
      return { ...prevState, formType: type };
    });
    closeForm();
  };

  const handleUpdate = (type: FormType, id: string) => {
    setFormAction((prevState) => {
      return { ...prevState, formType: type };
    });
    switch (type) {
      case "product":
        const selectedProduct = products.find(({ _id }) => _id === id);
        setFormData(selectedProduct as any);
        setHelperFormData((prevState: any) => {
          return {
            ...prevState,
            categories: selectedProduct?.categories || [],
            subCategories: selectedProduct?.subCategories || [],
          };
        });
        setProductServiceAction("update");
        closeForm();
        break;
      case "service":
        const selectedService = services.find(({ _id }) => _id === id);
        setFormData(selectedService as any);
        setHelperFormData((prevState: any) => {
          return {
            ...prevState,
            categories: selectedService?.categories || [],
            subCategories: selectedService?.subCategories || [],
          };
        });
        setProductServiceAction("update");
        closeForm();
        break;
      default:
        break;
    }
  };

  const handleDelete = async (type: FormType, id: string) => {
    setProductServiceAction("remove");
    setLoadSpinner(true);
    try {
      const removeProductOrServiceUrl =
        type === "product"
          ? apiRoutes.routeHandler.userBusiness.removeProduct
          : apiRoutes.routeHandler.userBusiness.removeService;

      const idPramKey =
        type === "product"
          ? ApplicationIdKeys.PRODUCT_ID
          : ApplicationIdKeys.SERVICE_ID;

      const { data: data2 } = await axios.delete(
        `${removeProductOrServiceUrl}?${idPramKey}=${id}`
      );
      updateProductGlobalState("remove", data2?.data);
      setLoadSpinner(false);
    } catch (e: any) {
      setLoadSpinner(false);
      clientErrorHandler(e);
      alert(error);
    }
  };

  const removeCategory = (
    value: string,
    type: "categories" | "subCategories"
  ) => {
    const data = helperFormData[type].filter((item) => item !== value);
    setHelperFormData((prevState) => {
      return { ...prevState, [type]: data };
    });
  };

  const getFormData = () => {
    const _formData = JSON.parse(JSON.stringify(formData));
    const _helperFormData = JSON.parse(JSON.stringify(helperFormData));
    return Object.assign(_formData, _helperFormData);
  };

  const sendData = async (url: string, data: any) => {
    return await axios.post(url, data);
  };

  const updateProductGlobalState = (
    type: FormActionType,
    data: ProductsAndSevices
  ) => {
    if (!data || Object.keys(data).length === 0)
      throw {
        code: "empty-product-object",
        message: "object is empty",
      };

    const _services: ProductsAndSevices[] = JSON.parse(
      JSON.stringify(services)
    );

    const _products: ProductsAndSevices[] = JSON.parse(
      JSON.stringify(products)
    );

    const servicesOrproducts =
      formType === "product"
        ? _products
        : formType === "service"
        ? _services
        : null;

    const customState = formType === "product" ? "products" : "services";
    if (!servicesOrproducts) throw new Error("formtype is null");

    switch (type) {
      case "add":
        setProductsAndServices((prevState) => {
          return {
            ...prevState,
            [customState]: [...prevState[customState], data],
          };
        });
        break;
      case "update":
        servicesOrproducts.forEach((product, index) => {
          if (product._id === data._id) {
            servicesOrproducts[index] = data;
          }
          setProductsAndServices((prevState) => {
            return { ...prevState, [customState]: [...servicesOrproducts] };
          });
        });
        break;
      case "remove":
        const _data = servicesOrproducts.filter(
          (item) => item._id !== data._id
        );
        setProductsAndServices((prevState) => {
          return { ...prevState, [customState]: [..._data] };
        });
        break;
      default:
        break;
    }
  };

  const handleProductApiCall = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setError("");
    try {
      switch (ProductServiceAction) {
        case "add":
          const addProductOrServiceUrl =
            formType === "product"
              ? apiRoutes.routeHandler.userBusiness.addProduct
              : apiRoutes.routeHandler.userBusiness.addService;
          const formData = getFormData();
          console.log("====================================");
          console.log(formData);
          console.log("====================================");
          const { data } = await sendData(addProductOrServiceUrl, formData);
          updateProductGlobalState("add", data?.data);
          setIsDisabled(false);
          closeForm();
          break;
        case "update":
          const updateProductOrServiceUrl =
            formType === "product"
              ? apiRoutes.routeHandler.userBusiness.updateProduct
              : apiRoutes.routeHandler.userBusiness.updateService;
          const { data: data1 } = await sendData(
            updateProductOrServiceUrl,
            getFormData()
          );
          updateProductGlobalState("update", data1?.data);
          setIsDisabled(false);
          closeForm();
          break;
        case "remove":
          const removeProductOrServiceUrl =
            formType === "product"
              ? apiRoutes.routeHandler.userBusiness.removeProduct
              : apiRoutes.routeHandler.userBusiness.removeService;
          const { data: data2 } = await sendData(
            removeProductOrServiceUrl,
            getFormData()
          );
          updateProductGlobalState("remove", data2?.data);
          // router.refresh();
          setIsDisabled(false);
          closeForm();
          break;
        default:
          break;
      }
    } catch (e: any) {
      setIsDisabled(false);
      clientErrorHandler(e);
    }
  };

  const closeForm = () => {
    setFormAction((prevState) => {
      return { ...prevState, productFormAction: !productFormAction };
    });
  };

  return {
    closeForm,
    handleStringValues,
    handleKeyAction,
    removeCategory,
    handleProductApiCall,
    handleUpdate,
    hanldeAdd,
    handleDelete,
    isFormOpen: productFormAction,
    formData,
    helperFormData,
    isDisabled,
    error,
  };
};
