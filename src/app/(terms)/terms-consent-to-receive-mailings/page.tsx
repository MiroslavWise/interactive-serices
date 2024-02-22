import { CONSENT_TO_RECEIVE_MAILINGS } from "@/helpers/constants/consent-to-receive-mailings"

export default function TermsConsentToReceiveMailings() {
  return (
    <ul>
      {CONSENT_TO_RECEIVE_MAILINGS.map((item, index) => {
        if (item.h) return <h3 key={"::" + index + "::Receive::"}>{item.h}</h3>
        if (item.p) return <p key={"::" + index + "::Receive::"}>{item.p}</p>
        if (item.i) return <i key={"::" + index + "::Receive::"}>{item.i}</i>
        return null
      })}
    </ul>
  )
}
