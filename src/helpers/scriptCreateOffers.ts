import { IPostOffers } from "@/services/offers/types"

import { EnumTypeProvider } from "@/types/enum"

import { queryClient } from "@/context"
import { createAddress } from "./address/create"
import { getGeocodeSearch, postOffer } from "@/services"
import { transliterateAndReplace } from "./functions/regEx"

const array: number[] = []

for (let i = 1; i <= 87; i++) {
  array.push(i)
}
const onTitle = (value: number) => `Обсудим, что происходит у вас в доме - ${value}`
const onDescription = (value: number) =>
  `Обсуждаем, что же происходит в доме Красноармейская ${value}, как остоят дела, что с родственниками. Дружная ли улица?`
const onSlug = (value: string) => transliterateAndReplace(value).slice(0, 254)

async function create(id: number, userId: number) {
  const address = `Брестская область, Столин, улица Красноармейская,  ${id}`.replaceAll(" ", "-")
  const response = await queryClient.fetchQuery({
    queryFn: () => getGeocodeSearch(address),
    queryKey: ["addresses", { string: address }],
  })

  if (!!response) {
    const addressRESPONSE = response?.response?.GeoObjectCollection?.featureMember[0]

    const { data: dataAddress } = await createAddress(addressRESPONSE, userId)
    const { id: idAddress } = dataAddress ?? {}

    const title = onTitle(id)
    const description = onDescription(id)
    const slug = onSlug(title)
    const data: IPostOffers = {
      provider: EnumTypeProvider.alert,
      description: description,
      slug: slug,
      enabled: true,
      desired: true,
      title: title,
      addresses: [idAddress!],
    }

    postOffer(data)
  }
}

function createMoreAddress(userId: number) {
  for (const item of array) {
    create(item, userId)
  }
}

export { createMoreAddress }
