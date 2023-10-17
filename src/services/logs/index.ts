import type { IServiceLogs } from "./types"
import { wrapperFetch } from "../requestsWrapper"

export const serviceLogs: IServiceLogs = {
    route: "/logs",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
}
