import { FBAccessTokenCookieKey, FBUserIdCookieKey } from "@/config/facebook";
import { getPageId } from "@/helpers/facebook";
import {
  FBPageMetaData,
  ManageFBPageResponse,
  FBPagePickedProperties,
} from "@/app/ts/types";
import { cookies } from "next/headers";
import HomeContainer from "./home";

const facebookPageHandler = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(FBAccessTokenCookieKey);
  const FBUserId = cookieStore.get(FBUserIdCookieKey);
  const res = await getPageId(accessToken?.value!, FBUserId?.value!);
  const data: ManageFBPageResponse = await res.json();
  if (res.ok) {
    const _data: Pick<FBPageMetaData, keyof FBPagePickedProperties>[] = [];
    data.data.forEach((item) => {
      const PageMetaData = {
        id: item.id,
        name: item.name,
      };
      _data.push(PageMetaData);
    });

    return _data;
  } else return Promise.reject(data);
};

export default async function Home() {
  try {
    const data: FBPagePickedProperties[] = await facebookPageHandler();
    return (
      <main>
        <h1>hello home</h1>
        <HomeContainer FBPagesMetaData={data} />
      </main>
    );
  } catch ({ error }: any) {
    return <h1>error occured</h1>;
  }
}
