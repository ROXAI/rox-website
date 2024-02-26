import InstagramCard from "@/app/components/organisms/Instagram/instagram";
import {
  PageReqMetaData,
  facebookLoginResponseParams,
} from "@/app/ts/interface";
import { apiRoutes } from "@/data/routes";
import { apiMutationWithFetch } from "@/helpers/api_mutation";
import { apiServerQuery } from "@/helpers/api_query";
import { getMetaUserAuthData } from "@/helpers/facebook";

const instagramAuth = async (searchParams: facebookLoginResponseParams) => {
  if (searchParams && Object.keys(searchParams).length !== 0) {
    if (searchParams.error) throw new Error(searchParams.error_description);
    const fbAuthData = await getMetaUserAuthData(searchParams.code);
    const apiMutation = apiMutationWithFetch();
    const data = await apiMutation("", fbAuthData);
    return data;
  }

  // get instagram user
  const apiQuery = apiServerQuery();
  const url = apiRoutes.socialAccount.getInstagramAccount;
  const instagramUser = await apiQuery(url);
  return instagramUser;
};

export default async function Home(req: PageReqMetaData) {
  try {
    const user = await instagramAuth(req.searchParams);
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    return (
      <main>
        <InstagramCard />
      </main>
    );
  } catch (error: any) {
    return <div>error occured {error.message}</div>;
  }
}
