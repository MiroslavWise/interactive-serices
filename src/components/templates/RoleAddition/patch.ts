import { pathUserRoles } from "@/services"

interface IData {
  id: number
  oldRoles: number[]
  newRoles: number[]
}

export async function updateUserRole({ id, oldRoles, newRoles }: IData) {
  const oldSort = JSON.stringify(oldRoles.sort())
  const newSort = JSON.stringify(newRoles.sort())

  if (oldSort !== newSort) {
    return pathUserRoles(newRoles, id)
  }

  return Promise.resolve({ data: "not-update" } as const)
}
