import { wrapperGet, wrapperPost } from "../requestsWrapper"
import { TGetPhones, TPostPhone } from "./types"

const url = "/phones"

export const postPhone: TPostPhone = (values) => wrapperPost({ url, body: values })
export const getPhones: TGetPhones = () => wrapperGet({ url })
