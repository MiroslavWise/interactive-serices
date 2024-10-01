import "server-only"

import { cache } from "react"

import { EnumTypeProvider } from "@/types/enum"

import env from "@/config/environment"
import { getOffers } from "@/services"
import { getPosts } from "@/services/posts"

const getCachePosts = cache(getPosts)
const getCacheOffers = cache(getOffers)
const getCacheAlerts = cache(getOffers)
const getCacheDiscussions = cache(getOffers)

const getServerData = {
  posts: env.server.host.includes("dev") ? Promise.resolve({ data: [] }) : getCachePosts({ order: "DESC", archive: 0, limit: 377 }),
  offers: env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCacheOffers({ provider: EnumTypeProvider.offer, order: "DESC", limit: 377 }),
  alerts: env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCacheAlerts({ provider: EnumTypeProvider.alert, order: "DESC", limit: 377 }),
  discussions: env.server.host.includes("dev")
    ? Promise.resolve({ data: [] })
    : getCacheDiscussions({ provider: EnumTypeProvider.discussion, order: "DESC", limit: 377 }),
} as const

export { getServerData }
