import type { IImageData } from "@/store/types/useAuthState"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"
import type { IAuthor } from "@/store/types/createPhotoOffer"
import { IResponseOffers } from "@/services/offers/types"

export const usePhotoVisible = () => {
    const { dispatchPhotoOffer } = usePhotoOffer((_) => ({
        dispatchPhotoOffer: _.dispatchPhotoOffer,
    }))

    function createGallery(
        offer: IResponseOffers,
        items: IImageData[],
        item: IImageData,
        index: number,
        author?: IAuthor,
    ) {
        dispatchPhotoOffer({
            offer: offer,
            current: {
                id: item?.id,
                url: item?.attributes?.url!,
                index: index,
            },
            photos: items?.map((item_, index_) => ({
                id: item_?.id!,
                url: item_?.attributes?.url!,
                index: index_,
            })),
            visible: true,
            author: author ? author : undefined,
        })
    }

    return { createGallery }
}
