
import facebook from "../../../../../public/icons8-facebook.svg";
import twitterx from "../../../../../public/icons8-twitterx.svg";
import instagram from "../../../../../public/icons8-instagram.svg";
import { ToolsbarLabel } from "../../atom/toolsbarLabel";
import { ToolbartItem } from "../../molecules/toolbarItem";
interface AutomationProps {
  label: string;
  mgTop?: number;
}

export const Automation: React.FC<AutomationProps> = ({ label, mgTop = 5 }) => {
  return (
    <div style={{ marginTop: `${mgTop}rem` }}>
      <ToolsbarLabel label={label} />
      <ToolbartItem icon={facebook} text="facebook" />
      <ToolbartItem icon={twitterx} text="twitter x" />
      <ToolbartItem icon={instagram} text="instagram" />
    </div>
  );
};
