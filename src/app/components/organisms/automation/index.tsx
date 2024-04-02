import facebook from "../../../../../public/icons8-facebook.svg";
import twitterx from "../../../../../public/icons8-twitterx.svg";
import instagram from "../../../../../public/icons8-instagram.svg";
import { ToolsbarLabel } from "../../atom/toolsbarLabel";
import { ToolbartItem } from "../../molecules/toolbarItem";
import Link from "next/link";
interface AutomationProps {
  label: string;
  mgTop?: number;
}

export const Automation: React.FC<AutomationProps> = ({ label, mgTop = 5 }) => {
  return (
    <div style={{ marginTop: `${mgTop}rem` }}>
      <ToolsbarLabel label={label} />
      <Link href={"/dashboard/social-accounts/facebook"}>
        <ToolbartItem icon={facebook} text="facebook" />
      </Link>
      <Link href={"/dashboard/social-accounts/instagram"}>
        <ToolbartItem icon={instagram} text="instagram" />
      </Link>
      <ToolbartItem icon={twitterx} text="twitter x" />
    </div>
  );
};
