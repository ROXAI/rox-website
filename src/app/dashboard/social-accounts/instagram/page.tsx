import SocialAccountStatusCard from "@/app/components/organisms/Instagram/instagram";
import {
  PageReqMetaData,
  SocialAccount,
  facebookLoginResponseParams,
} from "@/app/ts/interface";
import { apiRoutes } from "@/data/routes";
import { apiMutationWithFetch } from "@/helpers/api_mutation";
import { apiServerQuery } from "@/helpers/api_query";
import { getMetaUserAuthData } from "@/helpers/facebook";

import styles from "./styles/instagram.module.css";
import { IG_BusinessLogin } from "@/app/Actions/facebook/business-login";

const instagramAuth = async (searchParams: facebookLoginResponseParams) => {
  if (searchParams && Object.keys(searchParams).length !== 0) {
    if (searchParams.error) throw new Error(searchParams.error_description);
    const fbAuthData = await getMetaUserAuthData(
      searchParams.code,
      "dashboard/social-accounts/instagram"
    );
    const url = apiRoutes.socialAccount.createAccount;
    const apiMutation = apiMutationWithFetch();
    const { data } = await apiMutation(url, fbAuthData);

    return data as SocialAccount;
  }

  // get instagram user
  const apiQuery = apiServerQuery();
  const url = apiRoutes.socialAccount.getInstagramAccount;
  const { data } = await apiQuery(url);
  return data as SocialAccount;
};

export default async function Home(req: PageReqMetaData) {
  try {
    const data = await instagramAuth(req.searchParams);

    return (
      <main className={styles["Container"]}>
        <SocialAccountStatusCard
          logoUrl="/icons8-instagram.svg"
          accountData={data}
          handler={IG_BusinessLogin}
        />
      </main>
    );
  } catch (error: any) {
    return (
      <div className={styles["Container"]}>
        <span>error occured {error.code}</span>
      </div>
    );
  }
}
