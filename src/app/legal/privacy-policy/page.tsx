import { POLICY } from "@/helpers/constants/policy"
import { type Metadata } from "next"

const title = "Политика обработки персональных данных"

export const metadata: Metadata = {
  title,
  description: title,
  appleWebApp: { title, statusBarStyle: "default" },
  category: "policy, terms",
  openGraph: { title, description: title },
}

export default () => (
  <ul>
    {POLICY.map((item, index) =>
      item.h ? (
        <h3 key={`::${index}::POLICY::`} id={`h3-terms-policy-${index}`}>
          {item.h}
        </h3>
      ) : item.p ? (
        <p key={`::${index}::POLICY::`} id={`p-terms-policy-${index}`}>
          {item.p}
        </p>
      ) : item.i ? (
        <i key={`::${index}::POLICY::`} id={`i-terms-policy-${index}`}>
          {item.i}
        </i>
      ) : null,
    )}
  </ul>
)
