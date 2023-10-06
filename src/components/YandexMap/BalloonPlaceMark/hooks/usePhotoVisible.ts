import type { IImageData } from "@/store/types/useAuthState"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"
import { IAuthor } from "@/store/types/createPhotoOffer"

export const usePhotoVisible = () => {
    const { dispatch } = usePhotoOffer()

    function createGallery(
        items: IImageData[],
        item: IImageData,
        index: number,
        author?: IAuthor,
    ) {
        console.log("author hooks:", author)
        dispatch({
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
