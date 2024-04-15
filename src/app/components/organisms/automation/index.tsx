import facebook from "../../../../../public/icons8-facebook.svg";
import twitterx from "../../../../../public/icons8-twitterx.svg";
import instagram from "../../../../../public/icons8-instagram.svg";
import { ToolsbarLabel } from "../../atom/toolsbarLabel";
import { ToolbartItem } from "../../molecules/toolbarItem";
import { useNavigation } from "@/app/hooks/ui/navigation";
interface AutomationProps {
  label: string;
  mgTop?: number;
}

export const Automation: React.FC<AutomationProps> = ({ label, mgTop = 5 }) => {
  const { navigate } = useNavigation();
  return (
    <div style={{ marginTop: `${mgTop}rem` }}>
      <ToolsbarLabel label={label} />
      <ToolbartItem
        icon={facebook}
        text="facebook"
        handler={() => navigate("/dashboard/social-accounts/facebook")}
      />

      <ToolbartItem
        icon={instagram}
        text="instagram"
        handler={() => navigate("/dashboard/social-accounts/instagram")}
      />

      <ToolbartItem icon={twitterx} text="twitter x" />
    </div>
  );
};
