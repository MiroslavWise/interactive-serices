import { RULES } from "@/helpers/constants/rules"

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
