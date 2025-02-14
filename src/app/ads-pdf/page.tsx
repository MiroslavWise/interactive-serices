import env from "@/config/environment"
import { Metadata } from "next"

const title = "Реклама на Sheira - интеграция вашего бизнеса в повседневную жизнь людей"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, ads",
  openGraph: { title, description: title, images: `${env.server.host!}/api/og` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const url = "/pdf/ads.pdf"

export default () => (
  <iframe title={title} src={url} className="w-full h-dvh" width="100%" height="100dvh" frameBorder={0}>
    <p>
      Ваш браузер не поддерживает PDF.
      <a href={url}>Скачайте файл</a>.
    </p>
  </iframe>
)
