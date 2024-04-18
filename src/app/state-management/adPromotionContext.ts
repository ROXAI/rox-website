import { atom, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { adContent as adContentType } from "../ts/interface";

const adContent = atom<adContentType[]>({
  key: uuidv4(),
  default: [
    {
      _id: "1",
      sourceArticle: "dsfwe",
      text: "why my time never come, abi e da form.",
    },
    {
      _id: "2",
      sourceArticle: "dsfweertuof",
      text: "why my time never come, abi e da form.",
    },
  ],
});

export const useGeneratedContentState = () => useRecoilState(adContent);
