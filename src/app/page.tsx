import Image from "next/image";
import styles from "./page.module.css";
import Wizard from 'components/wizard/wizard';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image 
          aria-hidden
          src="/aklivity-logo.svg"
          alt="Aklivity logo"
          width={195}
          height={60}
        />
      </header>
      <main className={styles.main}>
        <Wizard />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
