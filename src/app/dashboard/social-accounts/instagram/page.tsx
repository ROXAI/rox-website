import InstagramCard from "@/app/components/organisms/Instagram/instagram";
import {
  PageReqMetaData,
  facebookLoginResponseParams,
} from "@/app/ts/interface";
import { apiRoutes } from "@/data/routes";
import { apiMutationWithFetch } from "@/helpers/api_mutation";
import { apiServerQuery } from "@/helpers/api_query";
import { getMetaUserAuthData } from "@/helpers/facebook";

import styles from "./styles/instagram.module.css";

const instagramAuth = async (searchParams: facebookLoginResponseParams) => {
  if (searchParams && Object.keys(searchParams).length !== 0) {
    if (searchParams.error) throw new Error(searchParams.error_description);
    const fbAuthData = await getMetaUserAuthData(
      searchParams.code,
      "social-accounts/instagram"
    );
    const url = apiRoutes.socialAccount.createAccount;
    const apiMutation = apiMutationWithFetch();
    const data = await apiMutation(url, fbAuthData);

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
    const res = await instagramAuth(req.searchParams);
    console.log("====================================");
    console.log(res);
    console.log("====================================");

    return (
      <main className={styles["Container"]}>
        <InstagramCard accountData={res.data} />
      </main>
    );
  } catch (error: any) {
    const nock: any = {};
    return (
      <div className={styles["Container"]}>
        {/* <span>error occured {error.code}</span> */}
        <InstagramCard accountData={nock} />
      </div>
    );
  }
}
