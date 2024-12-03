import { EnumSign } from "@/types/enum"

import { dispatchAuthModal, EStatusAuth } from "@/store"
import { useStatusAuth } from "@/helpers/use-status-auth"

export const useSign = () => {
  const statusAuth = useStatusAuth()

  function handleAuthModal() {
    if (statusAuth === EStatusAuth.UNAUTHORIZED) {
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
    }
  }

  return handleAuthModal
}
