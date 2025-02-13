import { type Metadata } from "next"

const title = "Размещение рекламы"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, ads",
  openGraph: { title, description: title },
}

export default () => (
  <ul className="h-full w-full overflow-y-auto flex flex-col items-start gap-3">
    <h1 className="mb-4 font-bold text-text-primary text-[2rem] leading-9">{title}</h1>
    <p className="!font-light -mt-2">
      <a href="">Подробности в нашей презентации.</a>
    </p>
    {/* <p className="!font-light">
      Мы рады представить вам коммерческую часть нашей платформы, которая открывает новые возможности для рекламы и продвижения вашего
      бизнеса.
    </p>
    <p className="!font-light -mt-2">
      Каждый день пользователи sheira.ru ищут услуги и исследуют активности на карте города – встраивайте своё предложение нативно.
    </p>
    <p className="!font-light">—&nbsp;Сделайте ваше предложение заметным с помощью выделения и добавления информации</p>
    <p className="!font-light -mt-2">—&nbsp;Добавляйте кнопки действия для повышения отклика</p>
    <p className="!font-light -mt-2">
      —&nbsp;Создавайте яркие рекламные объявления в шапке сайта и в личном кабинете активных пользователей
    </p>
    <p className="!font-light -mt-2">—&nbsp;Возможность тестового запуска для оптимизации стратегии и повышения эффективности</p>
    <p className="!font-light">
      Наша команда экспертов всегда готова помочь вам с выбором рекламных интеграций и ответить на все ваши вопросы. Свяжитесь с нами в
      телеграм{" "}
      <a href="https://t.me/sheirainfo" target="_blank">
        @sheirainfo
      </a>{" "}
      или <a href="mailto:reklama@sheira.ru">reklama@sheira.ru</a>, чтобы узнать больше о возможностях рекламы и продвижения.
    </p>
    <p className="!font-light -mt-2">
      Подробности в нашей презентации. (ссылка открывается в отдельном окне – там можно просмотреть файл и скачать его)
    </p> */}
  </ul>
)
