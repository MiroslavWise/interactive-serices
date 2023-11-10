import { create } from "zustand"

import type {
    IUseVisibleBannerNewServicesState,
    IUseVisibleNewServiceBarterRequests,
} from "../types/useVisibleBannerNewServicesState"
import type { IUseWelcomeModal } from "../types/useWelcomeModal"
import type { IUseUpdateProfileState } from "../types/useUpdateProfile"
import type { IUsePopupMenuChat } from "../types/usePopupMenuChat"
import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"
import type { IUseVisibleModalBarter } from "../types/useVisibleModalBarter"
import type { IUseVisiblePhotosCarousel } from "../types/useVisiblePhotosCarousel"
import type { IUseVisibleAndTypeAuthModalState } from "../types/useVisibleAndTypeAuthModalState"

export const useVisibleBannerNewServicesState =
    create<IUseVisibleBannerNewServicesState>((set, get) => ({
        isVisibleNewServicesBanner: false,
        setIsVisibleNewServicesBanner(value) {
            set({
                isVisibleNewServicesBanner: value,
            })
        },
    }))

export const useVisibleNewServiceBarterRequests =
    create<IUseVisibleNewServiceBarterRequests>((set, get) => ({
        isVisibleNewServiceBarterRequests: false,
        setIsVisibleNewServiceBarterRequests(value) {
            set({ isVisibleNewServiceBarterRequests: value })
        },
    }))

export const useVisibleAndTypeAuthModalState =
    create<IUseVisibleAndTypeAuthModalState>((set, get) => ({
        visible: false,
        type: null,
        setVisibleAndType({ visible, type }) {
            set({
                visible,
                type,
            })
        },
    }))

export const useVisibleModalBarterState = create<IUseVisibleModalBarter>(
    (set, get) => ({
        isVisible: false,
        dataProfile: undefined,
        dataOffer: undefined,

        dispatchVisibleBarter({ isVisible, dataProfile, dataOffer }) {
            set({
                isVisible: isVisible,
            })
            if (dataProfile !== undefined) {
                set({
                    dataProfile: dataProfile,
                })
                if (dataOffer !== undefined) {
                    set({
                        dataOffer: dataOffer,
                    })
                }
            } else {
                setTimeout(() => {
                    set({
                        dataProfile: undefined,
                        dataOffer: undefined,
                    })
                }, 305)
            }
        },
    }),
)

export const useVisibleExchangesState = create<IUseVisibleExchanges>(
    (set, get) => ({
        isVisible: false,
        type: undefined,

        setVisibleType({ visible, type }) {
            set({
                isVisible:
                    typeof visible !== "undefined" ? visible : get().isVisible,
                type: typeof type !== "undefined" ? type : get().type,
            })
        },
    }),
)

export const useVisiblePhotosCarouselState = create<IUseVisiblePhotosCarousel>(
    (set, get) => ({
        isVisible: false,
        photos: [],
        currentPhoto: null,
        setPrev() {
            const currentIndex =
                get().photos.findIndex(
                    (item) => item.id === get().currentPhoto?.id,
                ) || 0
            const length = get().photos.length

            if (currentIndex === 0) {
                get().setCurrentPhoto({
                    currentPhoto: get().photos[length - 1],
                })
            } else {
                get().setCurrentPhoto({
                    currentPhoto: get().photos[currentIndex - 1],
                })
            }
        },
        setNext() {
            const currentIndex =
                get().photos.findIndex(
                    (item) => item.id === get().currentPhoto?.id,
                ) || 0
            const length = get().photos.length

            if (currentIndex === length - 1) {
                get().setCurrentPhoto({ currentPhoto: get().photos[0] })
            } else {
                get().setCurrentPhoto({
                    currentPhoto: get().photos[currentIndex + 1],
                })
            }
        },
        setCurrentPhoto({ currentPhoto }) {
            console.log("setCurrentPhoto: ", currentPhoto)
            set({
                currentPhoto: currentPhoto,
            })
        },
        setVisibleCarousel({ photos, idPhoto, visible }) {
            set({
                isVisible: visible,
            })
            if (visible && photos) {
                set({
                    photos: photos || [],
                    currentPhoto: photos?.find((item) => item.id === idPhoto),
                })
            } else {
                setTimeout(() => {
                    set({
                        photos: [],
                        currentPhoto: null,
                    })
                }, 300)
            }
        },
    }),
)

export const useWelcomeModalState = create<IUseWelcomeModal>((set, get) => ({
    isVisible: false,
    page: 1,

    setPrev() {
        if (get().page > 1) set({ page: get().page - 1 })
    },
    setNext() {
        if (get().page < 4) {
            set({ page: get().page + 1 })
        } else {
            set({ isVisible: false })
        }
    },
    setPage(value) {
        if (value !== get().page) {
            set({ page: value })
        }
    },
    setVisible(value) {
        set({ isVisible: value })
    },
}))

export const usePopupMenuChatState = create<IUsePopupMenuChat>((set, get) => ({
    isVisible: false,

    setIsVisible(value) {
        set({
            isVisible: typeof value === "undefined" ? !get().isVisible : value,
        })
    },
}))

export const useUpdateProfileState = create<IUseUpdateProfileState>(
    (set, get) => ({
        isVisible: false,

        setVisible(value) {
            set({ isVisible: value })
        },
    }),
)

interface IBarters {
    userId: number // Юзер, создающий бартер
    initiatorId: number // Юзер, предлагающий бартер, по сути, и есть создающий(что-бы не нарушать общий интерфейс запросов, userId остаётся)
    offeredId: number // Юзер, которому предлагается бартер
    title: string //
    date: Date // День, в который будет будет испольняться бартер(позже нужно будет передлать на промежуток времени(но, я вообще считаю это поле бесполезным))

    addressId: number //
    enabled: boolean //
    createdById?: number // равен initiatorId
    updatedById?: number //
    categoryId?: number //если у человека нет предложений, он можно просто из селектора выбрать, что он может предложить
    initiatorOfferId?: number //id оффера, предлагаемого инициатором бартера
    requestId?: number // id оффера, или запроса, на который идёт бартер, т.е. id оффера юзера, которому идёт предложение бартера
}
