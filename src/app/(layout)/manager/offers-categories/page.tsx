import TableRows from "./components/table-rows"

import styles from "./page.module.scss"

export default () => {
  return (
    <main className={styles.main}>
      <section>
        <table>
          <caption>Таблица предложений к &laquo;Категории офферов&raquo;</caption>
          <thead>
            <tr>
              <th />
              <th>Заголовок предложения</th>
              <th>Провайдер</th>
              <th>Тэги</th>
              <th>Действия</th>
            </tr>
          </thead>
          <TableRows />
        </table>
      </section>
    </main>
  )
}
