import { RULES } from "@/helpers/constants/rules"
import { type Metadata } from "next"

const title = "Правилами пользования"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, rules",
  openGraph: { title, description: title },
}

export default () => (
  <ul>
    {RULES.map((item, index) =>
      item.h ? (
        <h3 key={`::${index}::RULES::`}>{item.h}</h3>
      ) : item.p ? (
        <p key={`::${index}::RULES::`}>{item.p}</p>
      ) : item.i ? (
        <i key={`::${index}::RULES::`}>{item.i}</i>
      ) : null,
    )}
  </ul>
)
