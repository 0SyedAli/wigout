import "../globals.css";
import "../auth.module.css";
import styles from "../auth.module.css";

export default function AuthLayout({ children }) {
    return (


         <div className={styles.auth_container}>
          <div className={styles.auth_image}></div>
          <div className={styles.auth_form_container}>
            <div
              className={`${styles.auth_form}`}
            >
              {children}
            </div>
          </div>
        </div>
    );
}
