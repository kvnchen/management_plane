import Image from "next/image";
import styles from "./page.module.css";
import Wizard from 'components/wizard/wizard';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Wizard />
      </main>
    </div>
  );
}
