import { SpinnerLoader } from "@/app/components/atom/spinner";
import { BusinessProfileForm } from "@/app/components/organisms/businessProfileForm";
import { ContentGeneratorPopUp } from "@/app/components/organisms/popupContainer";
import { ContentGeneratorCanva } from "@/app/components/template/contentGenerationCanva";



const ContentGenerator = async () => {
  return (
    <>
      <ContentGeneratorCanva />
      <ContentGeneratorPopUp />
      <BusinessProfileForm />
      <SpinnerLoader />
    </>
  );
};

export default ContentGenerator;
