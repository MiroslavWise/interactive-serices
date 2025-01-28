import { EModalData } from "@/store"
import { EnumTypeProvider } from "@/types/enum"
import { TSchemaCreate } from "./create.schema"
import { IResponseOffers } from "@/services/offers/types"
import { IPostAddress } from "@/services/addresses/types/serviceAddresses"

export const onDefault = ({
  offer,
  typeAdd,
  initMapAddress,
  stateModal,
}: {
  offer?: IResponseOffers
  typeAdd: EnumTypeProvider
  initMapAddress: IPostAddress
  stateModal: EModalData
}) =>
  offer
    ? {
        description: offer?.description ?? "",
        title: offer?.title ?? "",
        categoryId: offer?.categoryId ?? null,
        address: "",
        file: {
          file: [],
          string: [],
        },
        help: !!offer?.urgent,
        type: EnumTypeProvider.offer,
        userId: null,
        deletes: [],
      }
    : {
        description: "",
        categoryId: null,
        address: [EModalData.CreateNewOptionModalMap, EModalData.CreateNewOptionModalCopy].includes(stateModal)
          ? initMapAddress?.additional ?? ""
          : "",
        title: "",
        initAddress: initMapAddress ?? "",
        file: {
          file: [],
          string: [],
        },
        help: false,
        type: typeAdd!,
        userId: null,
        deletes: [],
      }
