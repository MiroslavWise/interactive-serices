import type {
  ILoggingService,
  IRequestLogin,
  IResponseLoginNot2fa,
  IResponseLoginOtp,
} from "./types/loggingService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const LoggingService: ILoggingService = {
  login(value) {
    return wrapperFetch.methodPost<IRequestLogin, IResponseLoginOtp & IResponseLoginNot2fa>("/auth/login", value)
  },
}