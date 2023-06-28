import Image from "next/image"

import type { TSignBanner } from "./types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { BannerCoins } from "./components/BannerCoins"

import styles from "./sign-banner.module.scss"

const SignBanner: TSignBanner = ({ handleSignUpOrSignIn }) => {

  return (
    <div className={styles.container}>
      <div className={styles.headerSign}>
        <Image
          src="/logo/wordmark.svg"
          alt="sheira"
          width={140}
          height={37}
        />
      </div>
      <main className={styles.content}>
        <section className={styles.descriptionSign}>
          <p className={styles.description}>Зарегистрируйтесь в Шейре и добавляйте свои предложения на карту.</p>
          <div className={styles.buttons}>
            <ButtonFill
              type="primary"
              label="Войти"
              classNames="w-100"
              handleClick={() => handleSignUpOrSignIn("SignIn")}
            />
            <ButtonDefault
              label="Зарегистрироваться"
              classNames="w-100"
              handleClick={() => handleSignUpOrSignIn("SignUp")}
            />
            <div className={styles.bannerContent}>
              <BannerCoins />
            </div>
          </div>
        </section>
      </main>
      <div className={styles.footer}>
        <a>Всё о Шейре</a>
      </div>
    </div>
  )
}

export default SignBanner