import { dispatchAuthModal, useAuth } from "@/store/hooks"

export const useSign = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  function handleAuthModal() {
    if (!isAuth && typeof isAuth !== "undefined") {
      dispatchAuthModal({
        visible: true,
        type: "SignUp",
      })
    }
  }

  return handleAuthModal
}
