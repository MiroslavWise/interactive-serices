import { create } from "zustand"
import { IAuthor, IUsePhotoOffer } from "../types/createPhotoOffer"
import { IPhoto } from "../types/createPhotoOffer"

export const usePhotoOffer = create<IUsePhotoOffer>((set, get) => ({
    offer: undefined,
    current: undefined,
    photos: [],
    visible: false,
    author: undefined,

    dispatchPhotoOffer({ current, photos, payload, visible, author, offer }) {
        console.log("dispatchPhotoOffer: close----", visible)
        const value: Partial<{
            current: IPhoto
            photos: IPhoto[]
            author?: IAuthor
        }> = {
            current: get().current,
            photos: get().photos,
        }
        const getPhotos = get().photos
        const getCurrent = get().current
        const getLength = getPhotos.length
        const getCurrentIndex = get()?.current?.index!

        if (author) {
            value.author = author
        }

        if (payload === "prev" && getCurrentIndex !== 0) {
            value.current = getPhotos?.find(
                (item) => item?.index === getCurrentIndex - 1,
            )
        }

        if (payload === "next" && getCurrent?.index !== getLength - 1) {
            value.current = getPhotos.find(
                (item) => item?.index === getCurrentIndex + 1,
            )
        }

        if (current) {
            value.current = current
        }

        if (photos) {
            value.photos = photos
        }

        if (photos === null || current === null) {
            value.current = undefined
            value.photos = []
            value.author = undefined
        }

        const getVisible =
            typeof visible === "undefined" ? get().visible : visible

        const getAuthor =
            typeof author === "undefined" ? get().author : value.author

        const getOffer = typeof offer === "undefined" ? get().offer : offer

        set({
            current: value.current!,
            photos: value.photos!,
            visible: getVisible,
            author: getAuthor,
            offer: getOffer,
        })
    },
}))
