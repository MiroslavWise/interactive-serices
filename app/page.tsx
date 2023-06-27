import { YandexMap } from 'components/YandexMap'
import { ComponentSing } from 'modules/ComponentSing' 
import { ModuleProfile } from 'modules/ModuleProfile'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <YandexMap />
      <ComponentSing />
      <ModuleProfile />
    </main>
  )
}