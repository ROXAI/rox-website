import styles from "./google.module.css";
import { FaGoogle } from "react-icons/fa";
interface GoogleAuthProps {
  text: string;
}

export const GoogleAuth: React.FC<GoogleAuthProps> = ({ text }) => {
  return (
    <div className={styles["Google-auth"]}>
      <span className={styles["Icon"]}>
        <FaGoogle size={20} />
      </span>
      <span>{text}</span>
    </div>
  );
};
