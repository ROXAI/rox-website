import { ScheduleAdPostConponent } from "@/app/components/template/shedule-ad-post";
import dynamic from "next/dynamic";

const AdListing = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/adListing/Adlisting"
    )
);
const SocialAccounts = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/social-accounts"
    )
);
const SelectedAdListing = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/finish-step/selectedAds"
    )
);

const ScheduleAdPost = () => {
  interface Con {
    [key: number]: any;
  }
  const components: Con = {
    // 0: <AdListing />,
    1: <SocialAccounts />,
    2: <SelectedAdListing />,
  };

  return (
    <>
      <ScheduleAdPostConponent components={components} />
    </>
  );
};

export default ScheduleAdPost;
