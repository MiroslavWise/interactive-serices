import styles from './page.module.scss'
import { SingModulePopup } from 'modules/PopupWindow/SingModulePopup'

export default function Home() {
  return (
    <main className={styles.main}>
      <SingModulePopup />
    </main>
  )
}