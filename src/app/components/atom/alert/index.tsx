import { Alert } from "keep-react";
import { WarningCircle } from "phosphor-react";

interface AlertComponentProps {
  errorMessage: string;
}
export const AlertComponent: React.FC<AlertComponentProps> = ({
  errorMessage,
}) => {
  return (
    <div style={{ width: "70%" }}>
      <Alert
        color="error"
        // withBorderAccent
        withBorderAccentPosition="right"
        additionalContent={
          <div className="mt-1 text-body-4 text-metal-500">{errorMessage}</div>
        }
        icon={<WarningCircle size={24} color="#0F3CD9" />}
        title="An Error Occured"
      />
    </div>
  );
};
