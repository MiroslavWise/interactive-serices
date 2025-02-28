"use client"

import FormRoleAddition from "./form"
import { IconSprite } from "@/components/icons/icon-sprite"

import { useRoleAdditionUser } from "@/store"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

function RoleAddition() {
  const user = useRoleAdditionUser(({ user }) => user)
  const isAdminRole = useIsAllowAccess("PATCH", "users")

  if (user && isAdminRole) {
    const { profile } = user ?? {}

    return (
      <>
        <article data-test="article-out-account">
          <div className="w-11 h-11 relative text-element-accent-1">
            <IconSprite id="icon-user-edit" className="w-7 h-7 aspect-square" />
          </div>
          <h2>Изменение роли к {profile?.firstName || "Имя"}</h2>
        </article>
        <FormRoleAddition {...user} />
      </>
    )
  }

  return null
}

RoleAddition.displayName = "RoleAddition"
export default RoleAddition
