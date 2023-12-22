import { create } from "zustand"

import type { IUseVisibleBannerNewServicesState, IUseVisibleNewServiceBarterRequests } from "../types/useVisibleBannerNewServicesState"
import type { IUseWelcomeModal } from "../types/useWelcomeModal"
import type { IUseUpdateProfileState } from "../types/useUpdateProfile"
import type { IUsePopupMenuChat } from "../types/usePopupMenuChat"
import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"
import type { IUseVisibleModalBarter } from "../types/useVisibleModalBarter"

export const useVisibleBannerNewServicesState = create<IUseVisibleBannerNewServicesState>((set, get) => ({
    isVisibleNewServicesBanner: false,
    dispatchNewServicesBanner(value) {
        set({
            isVisibleNewServicesBanner: value,
        })
    },
}))

export const dispatchNewServicesBanner = (value: boolean) =>
    useVisibleBannerNewServicesState.setState((_) => ({
        isVisibleNewServicesBanner: value,
    }))

export const useVisibleNewServiceBarterRequests = create<IUseVisibleNewServiceBarterRequests>((set, get) => ({
    isVisibleNewServiceBarterRequests: false,
    dispatchNewServiceBarterRequests(value) {
        set({ isVisibleNewServiceBarterRequests: value })
    },
}))

export const useVisibleModalBarterState = create<IUseVisibleModalBarter>((set, get) => ({
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
}))

export const useVisibleExchangesState = create<IUseVisibleExchanges>((set, get) => ({
    isVisible: false,
    type: undefined,

    dispatchExchanges({ visible, type }) {
        set({
            isVisible: typeof visible !== "undefined" ? visible : get().isVisible,
            type: typeof type !== "undefined" ? type : get().type,
        })
    },
}))

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

export const useUpdateProfileState = create<IUseUpdateProfileState>((set, get) => ({
    isVisible: false,

    setVisible(value) {
        set({ isVisible: value })
    },
}))

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
