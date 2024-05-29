import { dispatchAuthModal, useAuth_ } from "@/store/hooks"

export const useSign = () => {
  const isAuth = useAuth_(({ isAuth }) => isAuth)

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
