import SocialCard from "@/app/components/organisms/cards/socialCard";
// import { SocialAccount } from "@/app/ts/interface";
// import { apiRoutes } from "@/data/routes";
// import { apiServerQuery } from "@/helpers/api_query";

const getAccountData = async () => {
  //   const apiQuery = apiServerQuery();
  //   const url = apiRoutes.socialAccount.getInstagramAccount;
  //   const { data } = await apiQuery(url);
  //   return data as SocialAccount;
  return null;
};

export const FacebookCard = async () => {
  const data = await getAccountData();

  return (
    <SocialCard
      icon="/icons8-facebook.svg"
      name="facebook"
      accountStatus={false}
    />
  );
};
