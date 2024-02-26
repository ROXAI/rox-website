import {
  FBAccessTokenCookieKey,
  FBUserIdCookieKey,
} from "@/config/facebook";
import { ManageFBPageResponse } from "@/app/ts/types";
import { cookies } from "next/headers";
import { getPageId } from ".";
import axios from "axios";

export class FacebookPage {
  private FBPageAccessToken: string;
  private FBUserId: string;

  constructor() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(FBAccessTokenCookieKey);
    const FBUserId = cookieStore.get(FBUserIdCookieKey);
    this.FBPageAccessToken = accessToken?.value!;
    this.FBUserId = FBUserId?.value!;
  }

  getFBPageIds = async () => {
    const res = await getPageId(this.FBPageAccessToken, this.FBUserId);
    const data: ManageFBPageResponse = await res.json();
    return data.data[0];
  };

  createPost = async (data: any) => {
    const getPageIdData = await this.getFBPageIds();
    return await axios(
      `https://graph.facebook.com/v18.0/${getPageIdData.id}/feed?access_token=${getPageIdData.access_token}`,
      {
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
}
