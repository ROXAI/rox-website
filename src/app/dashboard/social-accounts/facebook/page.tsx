import SocialAccountStatusCard from "@/app/components/organisms/Instagram/instagram";
import styles from "./styles/facebook.module.scss";
import { FB_BusinessLogin } from "@/app/Actions/facebook/business-login";
import {
  PageReqMetaData,
  SocialAccount,
  facebookLoginResponseParams,
} from "@/app/ts/interface";
import { getMetaUserAuthData, getPageId } from "@/helpers/facebook";
import { apiRoutes } from "@/data/routes";
import { apiMutationWithFetch } from "@/helpers/api_mutation";
import { apiServerQuery } from "@/helpers/api_query";

const facebookAuthData = async (searchParams: facebookLoginResponseParams) => {
  if (searchParams && Object.keys(searchParams).length !== 0) {
    if (searchParams.error) throw new Error(searchParams.error_description);
    const metaAuthData = await getMetaUserAuthData(
      searchParams.code,
      "dashboard/social-accounts/facebook"
    );

    const data = await getPageId(metaAuthData.accessToken, metaAuthData.userId);
    const data_to_send = { ...metaAuthData, page: data };

    const url = apiRoutes.socialAccount.createFacebookAccount;
    const apiMutation = apiMutationWithFetch();
    const { data: __data } = await apiMutation(url, data_to_send);

    return __data as SocialAccount;
  }

   // get instagram user
   const apiQuery = apiServerQuery();
   const url = apiRoutes.socialAccount.getFBAccount;
   const { data } = await apiQuery(url);
   return data as SocialAccount;
};

export default async function Home(req: PageReqMetaData) {
  try {
    const data = await facebookAuthData(req.searchParams);
    return (
      <main className={styles["Container"]}>
        <SocialAccountStatusCard
          logoUrl="/icons8-facebook.svg"
          accountData={data}
          handler={FB_BusinessLogin}
        />
      </main>
    );
  } catch (error: any) {
    console.error(error);
    return (
      <div className={styles["Container"]}>
        <span>something went wronge please try again</span>
      </div>
    );
  }
}
