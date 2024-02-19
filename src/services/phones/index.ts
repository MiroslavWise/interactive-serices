import { wrapperGet, wrapperPost } from "../requestsWrapper"
import { TGetPhones, TPostPhone, TPostVerifyPhone } from "./types"

const url = "/phones"

export const postPhone: TPostPhone = (values) => wrapperPost({ url, body: { ...values, enabled: false } })
export const getPhones: TGetPhones = () => wrapperGet({ url })

export const postVerifyPhone: TPostVerifyPhone = (values) => wrapperPost({ url: `/verify-phone`, body: values })
