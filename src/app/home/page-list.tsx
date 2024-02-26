"use client";
import { FBPagePickedProperties } from "@/app/ts/types";
import axios from "axios";

export const PageList = ({
  pageList,
}: {
  pageList: FBPagePickedProperties[];
}) => {
  return pageList?.map((page) => <FBPage key={page.id} page={page} />);
};

const FBPage = ({ page }: { page: FBPagePickedProperties }) => {
  const handleFBPagePost = async () => {
    try {
      const { data } = await axios(`/api/facebook/createFBPagePost`, {
        method: "POST",
        data: JSON.stringify({
          message:
            "🚀 Exciting Tech News from Naetechween! Check out the latest advancements in technology that are shaping our future. Stay informed and inspired with the latest updates in the tech world. 🌐✨ #TechNews #Innovation",
          link: "https://techcrunch.com/2023/10/18/microsoft-launches-radius-an-open-source-application-platform-for-the-cloud/",
          published: "true",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("successful");
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>{page.name}</h2>
      <button onClick={handleFBPagePost} type="button">
        Post to Page
      </button>
    </div>
  );
};
