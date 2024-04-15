import { POLICY } from "@/helpers/constants/policy"

export const dynamic = "force-static"
export const dynamicParams = false

export default function TermsPolicy() {
  return (
    <ul>
      {POLICY.map((item, index) => {
        if (item.h) return <h3 key={"::" + index + "::POLICY::"}>{item.h}</h3>
        if (item.p) return <p key={"::" + index + "::POLICY::"}>{item.p}</p>
        if (item.i) return <i key={"::" + index + "::POLICY::"}>{item.i}</i>
        return null
      })}
    </ul>
  )
}
