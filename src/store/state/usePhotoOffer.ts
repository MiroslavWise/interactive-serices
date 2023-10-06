import { create } from "zustand"
import { IAuthor, IUsePhotoOffer } from "../types/createPhotoOffer"
import { IPhoto } from "../types/createPhotoOffer"

export const usePhotoOffer = create<IUsePhotoOffer>((set, get) => ({
    current: undefined,
    photos: [],
    visible: false,
    author: undefined,

    dispatch({ current, photos, payload, visible, author }) {
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

        set({
            current: value.current!,
            photos: value.photos!,
            visible: getVisible,
            author: getAuthor,
        })
    },
}))
