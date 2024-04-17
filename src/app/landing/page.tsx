import Link from "next/link"
import dynamic from "next/dynamic"

import BackgroundSvgOne from "./svg/1"
import BackgroundSvgOneMobile from "./svg/1-mobile"

import MainLogo from "./svg/logo"
import IconApple from "./svg/apple"
import IconGoogle from "./svg/google"
import IconVK from "./svg/vk"
import IconStar from "./svg/star"

const BackgroundSvgTwo = dynamic(() => import("./svg/2"), { ssr: true })
const BackgroundSvgTwoMobile = dynamic(() => import("./svg/2-mobile"), { ssr: true })

const BackgroundSvgPreFour = dynamic(() => import("./svg/pre-4"), { ssr: true })
const BackgroundSvgPreFourMobile = dynamic(() => import("./svg/pre-4-mobile"), { ssr: true })

const BackgroundSvgFour = dynamic(() => import("./svg/4"), { ssr: true })
const BackgroundSvgFourMobile = dynamic(() => import("./svg/4-mobile"), { ssr: true })

const BackgroundSvgFive = dynamic(() => import("./svg/5"), { ssr: true })
const BackgroundSvgFiveMobile = dynamic(() => import("./svg/5-mobile"), { ssr: true })

const BackgroundSvgSix = dynamic(() => import("./svg/6"), { ssr: true })
const BackgroundSvgSixMobile = dynamic(() => import("./svg/6-mobile"), { ssr: true })

const BackgroundSvgLastCity = dynamic(() => import("./svg/last-city"), { ssr: true })
const BackgroundSvgLastCityMobile = dynamic(() => import("./svg/last-city-mobile"), { ssr: true })

const IconApplePlay = dynamic(() => import("./svg/apple-play"), { ssr: true })
const IconGooglePlay = dynamic(() => import("./svg/google-play"), { ssr: true })

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
        <BackgroundSvgOneMobile />
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
          <p>
            Настя живёт в большом ЖК. Конечно, далеко не каждый его уголок хорошо убирают. Вот и Настя поскальзывается и падает прямо у
            подъезда.
          </p>
        </div>
        <BackgroundSvgTwo />
        <BackgroundSvgTwoMobile />
      </article>
      <article data-pre-four>
        <div data-text>
          <p>
            Врач выписывает таблетки, а Настя находит <span>Sheira</span> - сервис, где можно размещать информацию на карте.
          </p>
          <p>
            <span>«Расскажу всем про это!» — решает Настя и создает на карте Sheira предупреждение про скользкое место.</span>
          </p>
        </div>
        <BackgroundSvgPreFour />
        <BackgroundSvgPreFourMobile />
      </article>
      <article data-four>
        <div data-text>
          <p>
            Другие пользователи Шейры хвалят Настю за пост. Настя, понимает, что сервис <span>Sheira</span>, с его картой и полезными
            карточками - это и общение, и помощь рядом с домом, и новые клиенты для мини-бизнеса.
          </p>
        </div>
        <BackgroundSvgFour />
        <BackgroundSvgFourMobile />
      </article>
      <article data-five>
        <div data-text>
          <p>
            Настя создаёт карточку: <span>&#171;Научу вас делать панкейки&#187;</span>, выбирает то, что хочет взамен - выгул собаки - и
            постит карточку прямо на карту Шейры.
          </p>
        </div>
        <BackgroundSvgFive />
        <BackgroundSvgFiveMobile />
      </article>
      <article data-six>
        <div data-text>
          <p>
            В личку Насте за сутки поступает пять откликов — все хотят помочь! Настя выбирает Женю — он опытный собачник и живет
            в этом же подъезде.
          </p>
          <p>В Шейре можно меняться услугами — и в обмен на выгул пса Настя готовится испечь Евгению чудесный пирог.</p>
        </div>
        <BackgroundSvgSix />
        <BackgroundSvgSixMobile />
      </article>
      <article data-last-city>
        <div data-text>
          <div data-after />
          <p>
            Оказывается, Шейра - отличная площадка, что-бы помогать другим, общаться с соседями и вместе воплощатьв жизнь классные идеи!
          </p>
        </div>
        <BackgroundSvgLastCity />
        <BackgroundSvgLastCityMobile />
        <section>
          <p>
            <span>Sheira</span> - это уникальный сервис с реальной картой вашего города и разными активностями на ней. <span>Sheira</span>{" "}
            поможет найти специалистов поблизости, обсудить важные вопросы района и привлечь внимание к локальной проблема.
          </p>
          <p>
            Зарегистрируйтесь в <span>Sheira</span> - и вы откроете для себя мир талантливых и неравнодушных людей, которые живут совсем
            рядом с вами.
          </p>
        </section>
        <Link href="https://sheira.ru/" target="_blank">
          <span>Перейти в Sheira</span>
        </Link>
      </article>
      <footer>
        <section>
          <h4>Скачать приложение</h4>
          <div data-market>
            <IconApplePlay />
            <IconGooglePlay />
          </div>
        </section>
      </footer>
    </div>
  )
}
