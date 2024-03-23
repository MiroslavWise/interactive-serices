import Link from "next/link"

import BackgroundSvgOne from "./svg/1"
import BackgroundSvgThree from "./svg/3"

import MainLogo from "./svg/logo"
import IconApple from "./svg/apple"
import IconGoogle from "./svg/google"
import IconVK from "./svg/vk"
import IconStar from "./svg/star"

import "./style.scss"

export default function PageLanding() {
  return (
    <div className="landing-page">
      <article data-one>
        <section>
          <div data-links>
            <Link href="#" data-google>
              <IconGoogle />
            </Link>
            <Link href="#" data-apple>
              <IconApple />
            </Link>
            <Link href="#" data-vk>
              <IconVK />
            </Link>
            <Link href="#" data-star>
              <IconStar />
            </Link>
          </div>
          <div data-main-logo>
            <MainLogo />
            <p>Меняйся. Общайся. Помогай другим</p>
            <Link href="https://sheira.ru/" target="_blank">
              <span>Перейти в Sheira</span>
            </Link>
          </div>
        </section>
        <BackgroundSvgOne />
      </article>
      <article data-two>
        <section>
          <p>
            Жители больших городов живут насыщенной жизнью и в сети, и в реальности. Выгляните в окно — там все время что-то происходит.
          </p>
          <p>
            Но зачастую эти события проходят мимо тех, кто искренне хотел бы принять в них участие. Предложить помощь, обсудить
            что-то с соседями или просто встретиться.
          </p>
          <p>
            <span>Sheira</span> — это онлайн-версия того, что происходит вокруг. На интерактивную карту добавляются активности от реальных
            людей вокруг вас: объявления, обсуждения, новости и предупреждения. Посмотрите нашу презентацию — и вам сразу все станет
            понятно.
          </p>
        </section>
      </article>
      <article data-three>
        <div data-text>
          <p>Настя — одна из счастливых жительниц нового большого ЖК, похожего на гигантскую букву П</p>
          <p>
            Пока Настя не освоилась — ей еще предстоит познакомиться с соседями, отыскать хороший маникюр и СТО, и найти новых клиентов для
            своего мини-бизнеса с вкусными пирогами.
          </p>
        </div>
        <BackgroundSvgThree />
      </article>
    </div>
  )
}
