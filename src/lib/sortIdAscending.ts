import { TTypeProviderThreads } from "@/services/threads/types"

export function sortIdAscending(id1: number, id2: number): string | null {
  if (!id1 || !id2) {
    return null
  }

  return [id1, id2].sort().join(":")
}

interface IValuesProviderIdAscending {
  type: TTypeProviderThreads
  ids: number[]
}

export function providerIsAscending(values: IValuesProviderIdAscending): string | null {
  const {
    type,
    ids: [id1, id2, barterId],
  } = values
  if (type === "barter") {
    return `barter:${barterId}:${sortIdAscending(id1, id2)}`
  }
  if (type === "offer-pay") {
    return `offer-pay:${barterId}:${sortIdAscending(id1, id2)}`
  }
  if (type === "personal") {
    return `personal:${sortIdAscending(id1, id2)}`
  }

  return null
}
