import { ReactNode } from "react";
import {
  useActionState,
  useContentGenComponents,
  useContentGenerationState,
  useEditAdContentState,
  useSelectedAds,
} from "../state-management/helper-state";
import { useAlertHook } from "./alertHook";
import { getToken } from "../Actions";
import { userBusinessInfoState } from "../state-management/context";
import { useGeneratedContentState } from "../state-management/adPromotionContext";
import axios from "../../helpers/axios";
import { apiRoutes } from "@/data/routes";
import { adContent } from "../ts/interface";
import { useApiMutation } from "./apiMutation";
type SelectedProperties = {
  id: string;
  title: string;
  description: string;
  tone?: string;
};
export const useGenerateContent = () => {
  const [{ generateContentFormAction, generateContentStatus }, setAction] =
    useActionState();
  const [selectedProperties, setSelectedProperties] =
    useContentGenerationState();

  const [componentSettings, setContentGenComponent] = useContentGenComponents();
  const [businessData] = userBusinessInfoState();
  const [adContent, setAdContent] = useGeneratedContentState();
  const [editAdContent, setEditAdContent] = useEditAdContentState();
  // api hooks
  const { error, isDisabled, clientErrorHandler, setIsDisabled } =
    useAlertHook();

  const apiClientMutation = useApiMutation();

  const handleQuatity = (type: "add" | "remove") => {
    if (type === "add") {
      if (selectedProperties.adQuantity !== 10) {
        setSelectedProperties((prevState) => ({
          ...prevState,
          adQuantity: prevState.adQuantity + 1,
        }));
      }
    }
    if (type === "remove") {
      if (selectedProperties.adQuantity !== 0) {
        setSelectedProperties((prevState) => ({
          ...prevState,
          adQuantity: prevState.adQuantity - 1,
        }));
      }
    }
  };
  const handleSelectTone = (data: SelectedProperties) => {
    setSelectedProperties((prevState) => ({
      ...prevState,
      tone: data.title,
    }));
  };

  const handleSelectProducts = (_id: string) => {
    if (selectedProperties.products.includes(_id)) {
      const data = selectedProperties.products.filter((item) => item !== _id);
      setSelectedProperties((prevState) => ({
        ...prevState,
        products: data,
      }));
    } else {
      setSelectedProperties((prevState) => ({
        ...prevState,
        products: [...prevState.products, _id],
      }));
    }
  };

  const handleSelectServices = (_id: string) => {
    if (selectedProperties.services.includes(_id)) {
      const data = selectedProperties.services.filter((item) => item !== _id);
      setSelectedProperties((prevState) => ({
        ...prevState,
        services: data,
      }));
    } else {
      setSelectedProperties((prevState) => ({
        ...prevState,
        services: [...prevState.services, _id],
      }));
    }
  };

  const toggleForm = () =>
    setAction((prevState) => ({
      ...prevState,
      generateContentFormAction: !generateContentFormAction,
    }));

  const setComponent = (conponent: ReactNode) => {
    setContentGenComponent((prevState) => ({
      ...prevState,
      component: conponent,
    }));
    toggleForm();
  };

  const hanleGenerateContentApiCall = async () => {
    setIsDisabled(true);
    setAction((prevState) => ({
      ...prevState,
      generateContentStatus: "loading",
    }));
    try {
      const item = {
        ...selectedProperties,
        businessId: businessData.currentSelection._id || "",
      };
      const token = await getToken();
      const url = apiRoutes.adContent.generateAdContent;
      const { data } = await axios(url, {
        method: "post",
        data: item,
        headers: {
          Authorization: token,
        },
      });
      setAdContent(data?.data);
      setAction((prevState) => ({
        ...prevState,
        generateContentStatus: "completed",
      }));
      setIsDisabled(false);
    } catch (e: any) {
      setIsDisabled(false);
      clientErrorHandler(e);
    }
  };

  const handleEditAdContent = (data: {
    _id: string;
    text: string;
    component: ReactNode;
  }) => {
    setEditAdContent({ _id: data._id, text: data.text });
    setComponent(data.component);
  };

  const DeleteAdContentApiCall = async (id: string) => {
    setIsDisabled(true);
    try {
      const url = apiRoutes.adContent.deleteAdContent;
      const data = adContent.filter((item) => item._id !== id);
      setAdContent(data);
      await apiClientMutation(url, { _id: id });
    } catch (error: any) {
      setIsDisabled(false);
      clientErrorHandler(error);
    }
  };

  const editGeneratedAdApiCall = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsDisabled(true);
    const editableAdContent: adContent[] = JSON.parse(
      JSON.stringify(adContent)
    );
    editableAdContent.forEach((item) => {
      if (item._id === editAdContent._id) item.text = editAdContent.text;
    }) as any;

    try {
      const url = apiRoutes.adContent.editAdContent;
      await apiClientMutation(url, editAdContent);
      setIsDisabled(false);
      setAdContent(editableAdContent);
      toggleForm();
    } catch (error: any) {
      setIsDisabled(false);
      clientErrorHandler(error);
    }
  };

  const [selectedAds, setSelectedAds] = useSelectedAds();
  const handleSelectAds = async (id: string) => {
    const isSelected = selectedAds.find((item) => item._id === id);
    if (isSelected) {
      const newAds = selectedAds.filter((ad) => ad._id !== id);
      return setSelectedAds(newAds);
    }
    const ad = adContent.find((item) => item._id === id);
    setSelectedAds((prevState) => [...prevState, ad!]);

    try {
      const url = apiRoutes.adContent.addSelectedAds;
      const data = {
        ad: id,
        businessId: businessData?.currentSelection?._id || "",
      };
      await apiClientMutation(url, data);
    } catch (error: any) {
      clientErrorHandler(error);
    }
  };

  return {
    toggleForm,
    handleSelectTone,
    handleSelectProducts,
    handleSelectServices,
    setComponent,
    handleQuatity,
    hanleGenerateContentApiCall,
    editGeneratedAdApiCall,
    DeleteAdContentApiCall,
    handleEditAdContent,
    handleSelectAds,
    componentSettings,
    selectedProperties,
    isDisabled,
    formStatus: generateContentFormAction,
    generateContentStatus,
    adContent,
    error,
  };
};
