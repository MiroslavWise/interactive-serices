import { useAuthState } from "../state/useAuthState"

export const useAuth = () => {
    return useAuthState()
}
