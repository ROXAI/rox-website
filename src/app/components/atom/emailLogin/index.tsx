import styles from "./email-login.module.css";

interface EmailLoginProps {
  text: string;
}
export const EmailLogin: React.FC<EmailLoginProps> = ({ text }) => {
  return (
    <div className={styles["EmailLogin"]}>
      <hr />
      {text}
      <hr />
    </div>
  );
};
