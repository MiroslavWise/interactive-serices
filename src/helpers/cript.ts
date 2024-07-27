import Utf8 from "crypto-js/enc-utf8"
import Base64 from "crypto-js/enc-base64"

const SECRET_OFFER = "_offer_"
const SECRET_USER = "_user_"

const parse = (value: string) => Utf8.parse(value).toString(Base64)
const string = (value: string, r: string) => Base64.parse(value).toString(Utf8).replace(r, "")

const encryptedOffer = (value: number) => parse(`${SECRET_OFFER}${value}`)
const decryptedOffer = (value: string) => string(value, SECRET_OFFER)

const encryptedUser = (value: number) => parse(`${SECRET_USER}${value}`)
const decryptedUser = (value: string) => string(value, SECRET_USER)

export { encryptedOffer, decryptedOffer, encryptedUser, decryptedUser }
