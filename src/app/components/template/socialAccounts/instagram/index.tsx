import SocialCard from "@/app/components/organisms/cards/socialCard";
import { SocialAccount } from "@/app/ts/interface";
import { apiRoutes } from "@/data/routes";
import { apiServerQuery } from "@/helpers/api_query";

const getAccountData = async () => {
  const apiQuery = apiServerQuery();
  const url = apiRoutes.socialAccount.getInstagramAccount;
  const { data } = await apiQuery(url);
  return data as SocialAccount;
};

export const InstagramCard = async () => {
  try {
    const data = await getAccountData();
    return (
      <SocialCard
        icon="/icons8-instagram.svg"
        name="instagram"
        accountStatus={data?.isConnected}
      />
    );
  } catch (error: any) {
    return <div>error occured loading instagram card</div>;
  }
};
