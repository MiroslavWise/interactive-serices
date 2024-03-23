import Link from "next/link"

import BackgroundSvgOne from "./svg/1"
import BackgroundSvgThree from "./svg/3"
import BackgroundSvgPreFour from "./svg/pre-4"
import BackgroundSvgFour from "./svg/4"
import BackgroundSvgFive from "./svg/5"
import BackgroundSvgSix from "./svg/6"
import BackgroundSvgLastCity from "./svg/last-city"

import MainLogo from "./svg/logo"
import IconApple from "./svg/apple"
import IconGoogle from "./svg/google"
import IconVK from "./svg/vk"
import IconStar from "./svg/star"
import IconApplePlay from "./svg/apple-play"
import IconGooglePlay from "./svg/google-play"

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
      <article data-pre-four>
        <div data-text>
          <p>
            В первый же день с Настей случается проишествие — она подскальзывается прямо у подъезда. Пока врач выписывает лекарство, Настя
            находит в интернете Sheira — сервис для соседей, где можно размещать информацию на карте.
          </p>
          <p>
            <span>«Расскажу всем про эту застывшую лужу!» — решает Настя и создает на карте в Шейре яркое предупреждение.</span>
          </p>
        </div>
        <BackgroundSvgPreFour />
      </article>
      <article data-four>
        <div data-text>
          <p>
            Другие пользователи Шейры хвалят Настю за пост, она не может сдержать улыбку. Сервис Шейра, с его картой и полезными карточками,
            становится для Насти проводником и помощником в новом незнакомом месте.
          </p>
        </div>
        <BackgroundSvgFour />
      </article>
      <article data-five>
        <div data-text>
          <p>
            Насте нравится новый сервис. Шейра похожа на чат с соседями, только удобнее и понятнее, ведь любую активность сразу видно
            на карте.
          </p>
          <p>
            Настя создает карточку с предложением:&nbsp;
            <span>
              «Научу вас делать панкейки», выбирает то, что хочет взамен — выгул собаки — и постит предложение прямо на карту Шейры.
            </span>
          </p>
        </div>
        <BackgroundSvgFive />
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
      </article>
      <article data-suffix-description>
        <section>
          <p>
            После обмена Настя понимает — Шейра создана для того, чтобы помогать другим и реализовывать классные идеи вместе с соседями!
          </p>
          <p>
            Спустя пару месяцев ее ЖК на карте Шейры становится самым заметным в округе — здесь постоянно меняются разными бытовыми
            услугами, обращают внимание на происшествия и собираются вместе.
          </p>
        </section>
      </article>
      <article data-last-city>
        <BackgroundSvgLastCity />
        <Link href="https://sheira.ru/" target="_blank">
          <span>Перейти в Sheira</span>
        </Link>
      </article>
      <footer>
        <section>
          <h4>Над проектом работали:</h4>
          <article>
            <p>
              Автор: <span>Татьяна Новосельцева</span>
            </p>
            <p>
              Редактор: <span>Дарья Донина, Вячеслав Костылёв</span>
            </p>
            <p>
              Редактор инфографики: <span>Софья Шандыбина</span>
            </p>
            <p>
              Дизайнеры, иллюстратор: <span>Анастасия Мельникова, Евгения Шабурова</span>
            </p>
            <p>
              Арт директор: <span>Василий Егоров</span>
            </p>
            <p>
              Менеджеры проекта: <span>Дмитрий Куликов, Николай Варт</span>
            </p>
            <p>
              Продюсер: <span>Габриэла Чалабова</span>
            </p>
            <p>
              Продвижение в соцсетях: <span>Василина Баженова, Мария Денискина, Дарья Калинина, Анна Якушева</span>
            </p>
            <p>
              Разработка: <span>2UP</span>
            </p>
          </article>
        </section>
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
