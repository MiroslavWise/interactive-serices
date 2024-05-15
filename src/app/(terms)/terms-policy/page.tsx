import { POLICY } from "@/helpers/constants/policy"

export const dynamic = "force-static"
export const dynamicParams = false

export default function TermsPolicy() {
  return (
    <ul>
      {POLICY.map((item, index) => {
        if (item.h)
          return (
            <h3 key={"::" + index + "::POLICY::"} id={`h3-terms-policy-${index}`}>
              {item.h}
            </h3>
          )
        if (item.p)
          return (
            <p key={"::" + index + "::POLICY::"} id={`p-terms-policy-${index}`}>
              {item.p}
            </p>
          )
        if (item.i)
          return (
            <i key={"::" + index + "::POLICY::"} id={`i-terms-policy-${index}`}>
              {item.i}
            </i>
          )
        return null
      })}
    </ul>
  )
}
