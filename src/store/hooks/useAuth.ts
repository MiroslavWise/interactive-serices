import { shallow } from "zustand/shallow"

import { useAuthState } from "../state/useAuthState"


export const useAuth = () => {
  const content = useAuthState(state => ({
    token: state.token,
    refreshToken: state.refreshToken,
    userId: state.userId,
    profileId: state.profileId,
    expiration: state.userId,
    setToken: state.setToken,
    isAuth: state.isAuth,
    changeAuth: state.changeAuth,
    signOut: state.signOut,
    user: state.user,
    setUser: state.setUser,
  }), shallow)

  return content
}