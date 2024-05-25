import styles from "./page.module.scss"

export default () => {
  return (
    <main className={styles.main}>
      <section>
        <table>
          <caption>Таблица предложений к &laquo;Категории офферов&raquo;</caption>
          <thead>
            <tr>
              <th>ID пользователя</th>
              <th>Заголовок предложения</th>
              <th>Тэги</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </section>
    </main>
  )
}
