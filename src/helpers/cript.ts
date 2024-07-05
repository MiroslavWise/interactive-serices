import Utf8 from "crypto-js/enc-utf8"
import Base64 from "crypto-js/enc-base64"

const parse = (value: string) => Utf8.parse(value).toString(Base64)
const string = (value: string, r: string) => Base64.parse(value).toString(Utf8).replace(r, "")

const encryptedOffer = (value: number) => parse(`offer=${value}`)
const decryptedOffer = (value: string) => string(value, "offer=")

const encryptedUser = (value: number) => parse(`user=${value}`)
const decryptedUser = (value: string) => string(value, "user=")

export { encryptedOffer, decryptedOffer, encryptedUser, decryptedUser }
