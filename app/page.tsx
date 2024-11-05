import styles from "./page.module.css";
import {RegisterForm} from "@/components/RegisterForm";

export default function Home() {
  return (
    <div className={styles.page}>
        <main className={styles.main}>
            <RegisterForm/>
        </main>
        <footer className={styles.footer}>
        </footer>
    </div>
    );
}
