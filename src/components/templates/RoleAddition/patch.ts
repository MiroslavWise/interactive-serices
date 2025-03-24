import { pathUserRoles } from "@/services"
import { ETitleRole } from "@/services/roles/types"

interface IData {
  id: number
  oldRoles: ETitleRole[]
  newRoles: ETitleRole[]
}

export async function updateUserRole({ id, oldRoles, newRoles }: IData) {
  const oldSort = JSON.stringify(oldRoles.sort())
  const newSort = JSON.stringify(newRoles.sort())

  if (oldSort !== newSort) {
    return pathUserRoles(Array.from(new Set(newRoles)), id)
  }

  return Promise.resolve({ data: "not-update" } as const)
}
