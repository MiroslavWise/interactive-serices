import type {
  ILoggingService,
  IRequestLogin,
  IResponseLogin,
} from "./types/loggingService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const LoggingService: ILoggingService = {
  login(value) {
    return wrapperFetch.methodPost<IRequestLogin, IResponseLogin>("/auth/login", value)
  },
}