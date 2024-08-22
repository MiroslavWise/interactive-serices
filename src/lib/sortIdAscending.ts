import { EnumProviderThreads } from "@/types/enum"

function sortIdAscending(id1: number, id2: number): string | null {
  if (!id1 || !id2) {
    return null
  }

  return [id1, id2].sort().join(":")
}

interface IValuesProviderIdAscending {
  type: EnumProviderThreads
  ids: number[]
}

export function providerIsAscending(values: IValuesProviderIdAscending): string | null {
  const {
    type,
    ids: [id1, id2, barterId],
  } = values
  if (type === EnumProviderThreads.BARTER) {
    return `${EnumProviderThreads.BARTER}:${barterId}:${sortIdAscending(id1, id2)}`
  }
  if (type === EnumProviderThreads.OFFER_PAY) {
    return `${EnumProviderThreads.OFFER_PAY}:${barterId}:${sortIdAscending(id1, id2)}`
  }
  if (type === EnumProviderThreads.PERSONAL) {
    return `${EnumProviderThreads.PERSONAL}:${sortIdAscending(id1, id2)}`
  }
  if (type === EnumProviderThreads.HELP) {
    return `${EnumProviderThreads.HELP}:${barterId}:${sortIdAscending(id1, id2)}`
  }

  return null
}
