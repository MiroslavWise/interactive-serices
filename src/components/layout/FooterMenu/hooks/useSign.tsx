import { EnumSign } from "@/types/enum"

import { dispatchAuthModal, useAuth } from "@/store"

export const useSign = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  function handleAuthModal() {
    if (!isAuth && typeof isAuth !== "undefined") {
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignUp,
      })
    }
  }

  return handleAuthModal
}
