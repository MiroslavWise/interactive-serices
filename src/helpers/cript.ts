import Utf8 from "crypto-js/enc-utf8"
import Base64 from "crypto-js/enc-base64"

const encrypted = (value: number) => Utf8.parse(`offer=${value}`).toString(Base64)
const decryptedOffer = (value: string) => Base64.parse(value).toString(Utf8).replace("offer=", "")

export { encrypted, decryptedOffer }
