import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type {
  IUseVisibleAndTypeAuthModalState,
  IAction,
  IActionCreatePassword,
  IUseTimerModalAuth,
  IUseModalAuthEmailOrPhone,
  TTypeEmailOrNumber,
  IActionAuthModalVerification,
  TTypeSign,
} from "../types/useVisibleAndTypeAuthModalState"
import { IUserResponse } from "@/services/users/types"
import { dayFormat } from "@/helpers"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useModalAuth = create(
  persist<IUseVisibleAndTypeAuthModalState>(
    () => ({
      type: null,
      prevType: null,
    }),
    {
      name: "modal-auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export const useTimerModalAuth = create(
  persist<IUseTimerModalAuth>(() => ({ time: undefined }), { name: "timer-auth-create", storage: createJSONStorage(() => sessionStorage) }),
)
export const useModalAuthEmailOrPhone = create(
  persist<IUseModalAuthEmailOrPhone>(() => ({ typeEmailOrPhone: "phone" }), {
    name: "email-or-phone-state",
    storage: createJSONStorage(() => localStorage),
  }),
)

export const dispatchIModalAuthEmailOrPhone = (value: TTypeEmailOrNumber) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuthEmailOrPhone.setState((_) => ({
    typeEmailOrPhone: value,
  }))
}

export const dispatchAuthModal = ({ visible, type, email }: IAction) => {
  if (typeof visible !== "undefined") {
    if (visible) {
      dispatchModal(EModalData.ModalSign)
    } else {
      dispatchModalClose()
    }
  }
  useModalAuth.setState((_) => ({
    type: typeof type !== "undefined" ? type : _.type,
    email: typeof email !== "undefined" ? email : _.email,
  }))
}

export const dispatchAuthModalResetPassword = (value: string) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuth.setState((_) => ({
    type: "ResetPassword",
    codeReset: value,
  }))
}
export const dispatchAuthModalInformationCreateAccount = (value: string) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuth.setState((_) => ({
    type: "InformationCreateAccount",
    email: value,
  }))
}

export const dispatchAuthModalCreatePassword = ({ email, phone, agree, marketing }: IActionCreatePassword) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuth.setState((_) => ({
    type: "CreatePassword",
    email: email,
    phone: phone,
    agree,
    marketing,
  }))
}

export const dispatchAuthModalVerification = ({ confirmationCode, id }: IActionAuthModalVerification) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuth.setState((_) => ({
    verification: { confirmationCode, id },
    type: "CodeVerification",
  }))
}

export const dispatchStartTimer = () => {
  const timeSecond = Date.now() / 1000

  useTimerModalAuth.setState((_) => ({
    time: timeSecond,
  }))
}

export const dispatchIntervalTimer = () => useTimerModalAuth.setState((_) => ({}), true)

export const dispatchAuthModalCurrentUser = ({ user }: { user?: IUserResponse }) => {
  if (!!user) {
    dispatchModal(EModalData.ModalSign)
  } else {
    dispatchModalClose()
  }
  useModalAuth.setState((_) => ({
    type: !!user ? "CurrentUser" : null,
    user: user,
  }))
}

export const dispatchAuthModalCodeVerification = ({
  phone,
  idUser,
  prevType,
}: {
  phone: string
  idUser: number | string
  prevType: TTypeSign
}) => {
  dispatchModal(EModalData.ModalSign)
  useModalAuth.setState((_) => ({
    phone: phone,
    idUser: idUser,
    type: "CodeVerification",
    prevType: prevType,
  }))
}
