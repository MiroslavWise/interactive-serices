import { EnumTypeProvider } from "@/types/enum"
import type { INewCreate } from "./types/types"

export const NEW_CREATE_REQUESTS: INewCreate[] = [
  {
    imageSrc: "/png/create-requests/add-proposal.png",
    label: "Добавить предложение",
    value: EnumTypeProvider.offer,
  },
  {
    imageSrc: "/png/create-requests/add-request.png",
    label: "Добавить запрос",
    value: EnumTypeProvider.request,
  },
]
