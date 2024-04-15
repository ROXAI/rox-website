import { useSideBarVisibility } from "@/app/state-management/helper-state";
import { layoutSizes } from "@/data/layout";
import { useRouter } from "next/navigation";
export const useNavigation = () => {
  const [showSideBar, setShowSideBar] = useSideBarVisibility();
  const { push } = useRouter();
  const navigate = (url: string) => {
    if (window.innerWidth <= layoutSizes.mobile.width) {
      setShowSideBar(!showSideBar);
    }
    push(url);
  };

  return { navigate };
};
