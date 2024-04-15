import { RULES } from "@/helpers/constants/rules"

export const dynamic = "force-static"
export const dynamicParams = false
export const revalidate = false
export const fetchCache = "force-cache"

export default function TermsRules() {
  return (
    <ul>
      {RULES.map((item, index) => {
        if (item.h) return <h3 key={"::" + index + "::RULES::"}>{item.h}</h3>
        if (item.p) return <p key={"::" + index + "::RULES::"}>{item.p}</p>
        if (item.i) return <i key={"::" + index + "::RULES::"}>{item.i}</i>
        return null
      })}
    </ul>
  )
}
