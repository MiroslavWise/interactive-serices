import { shallow } from "zustand/shallow"

import { useAuthState } from "../state/useAuthState"

export const useAuth = () => {
    return useAuthState(
        (state) => ({
            email: state.email,
            token: state.token,
            refreshToken: state.refreshToken,
            userId: state.userId,
            profileId: state.profileId,
            expiration: state.userId,
            setToken: state.setToken,
            isAuth: state.isAuth,
            addresses: state.addresses,
            changeAuth: state.changeAuth,
            signOut: state.signOut,
            user: state.user,
            setUser: state.setUser,
            retrieveProfileData: state.retrieveProfileData,
            imageProfile: state.imageProfile,
            createdUser: state.createdUser,
        }),
        shallow,
    )
}
