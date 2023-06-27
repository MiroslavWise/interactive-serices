import { ComponentSign } from "../modules";
import styles from "./styles/page.module.scss";
import ServiceBanner from "../modules/ClassBanner/ServiceBanner";

export default function Home() {
  return (
    <main className={styles.main}>
      <ComponentSign />
      <ServiceBanner />
    </main>
  )
}