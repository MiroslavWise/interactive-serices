import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { EnumSign } from "@/types/enum"
import { type IUserResponse } from "@/services/users/types"

import type {
  IUseVisibleAndTypeAuthModalState,
  IAction,
  IActionCreatePassword,
  IUseTimerModalAuth,
  IUseModalAuthEmailOrPhone,
  TTypeEmailOrNumber,
} from "../types/useVisibleAndTypeAuthModalState"

export const useModalAuth = create(
  persist<IUseVisibleAndTypeAuthModalState>(
    () => ({
      visible: false,
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

export const dispatchCloseModalAuth = () => useModalAuth.setState((_) => ({ visible: false }), true)

export const dispatchIModalAuthEmailOrPhone = (value: TTypeEmailOrNumber) => {
  useModalAuth.setState(
    (_) => ({
      ..._,
      visible: true,
    }),
    true,
  )
  useModalAuthEmailOrPhone.setState((_) => ({
    typeEmailOrPhone: value,
  }))
}

export const dispatchAuthModal = ({ visible, type, email }: IAction) => {
  useModalAuth.setState((_) => ({
    visible: typeof visible !== "undefined" ? visible : false,
    type: typeof type !== "undefined" ? type : _.type,
    email: typeof email !== "undefined" ? email : _.email,
  }))
}

export const dispatchAuthModalResetPassword = (value: string) => {
  useModalAuth.setState((_) => ({
    visible: true,
    type: EnumSign.ResetPassword,
    codeReset: value,
  }))
}
export const dispatchAuthModalInformationCreateAccount = (value: string) => {
  useModalAuth.setState((_) => ({
    visible: true,
    type: EnumSign.InformationCreateAccount,
    email: value,
  }))
}

export const dispatchAuthModalCreatePassword = ({ email, phone, agree, marketing }: IActionCreatePassword) => {
  useModalAuth.setState((_) => ({
    visible: true,
    type: EnumSign.CreatePassword,
    email: email,
    phone: phone,
    agree,
    marketing,
  }))
}

// export const dispatchAuthModalVerification = ({ confirmationCode, id }: IActionAuthModalVerification) => {
//   dispatchModal(EModalData.ModalSign)
//   useModalAuth.setState((_) => ({
//     verification: { confirmationCode, id },
//     type: EnumSign.CodeVerification,
//   }))
// }

export const dispatchStartTimer = () => {
  const timeSecond = Date.now() / 1000

  useTimerModalAuth.setState((_) => ({
    time: timeSecond,
  }))
}

// export const dispatchIntervalTimer = () => useTimerModalAuth.setState((_) => ({}), true)

export const dispatchAuthModalCurrentUser = ({ user }: { user?: IUserResponse }) => {
  useModalAuth.setState((_) => ({
    visible: !!user,
    type: !!user ? EnumSign.CurrentUser : null,
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
  prevType: EnumSign | null
}) => {
  useModalAuth.setState((_) => ({
    visible: true,
    phone: phone,
    idUser: idUser,
    type: EnumSign.CodeVerification,
    prevType: prevType,
  }))
}
