import { wrapperFetch } from ".."
import { IServiceComplains } from "./types"

export const serviceComplains: IServiceComplains = {
    route: "/complains",
    post(values) {
        return wrapperFetch.methodPost(this.route, values)
    },
}
