import Image from "next/image";
import styles from "./page.module.css";
import Wizard from 'components/wizard/wizard';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <Wizard />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
