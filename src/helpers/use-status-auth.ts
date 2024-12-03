import { useAuth } from "@/store"
export const useStatusAuth = () => useAuth(({ isAuth }) => isAuth)
