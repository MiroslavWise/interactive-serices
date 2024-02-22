import styles from "./style.module.scss"

export function WalletPay() {
  return (
    <div className={styles.container}>
      <div data-img>
        <img src="/svg/wallet-pay.svg" alt="pay" width={24} height={24} />
      </div>
      <p>
        Пользователи Sheira смогут не только меняться с вами, но и покупать ваши услуги. Для обсуждения условий наш сервис автоматически
        создаст чат между вами и покупателем.
      </p>
    </div>
  )
}
