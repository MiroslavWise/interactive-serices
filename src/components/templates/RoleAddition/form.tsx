import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { updateUserRole } from "./patch"
import { getRoles } from "@/services/roles"
import { dispatchRoleAdditionUser } from "@/store"
import { ETitleRole } from "@/services/roles/types"
import { IUserResponse } from "@/services/users/types"
import { resolverSchemaRoleUser, TSchemaRoleUser } from "./schema"

function FormRoleAddition(props: IUserResponse) {
  const [loading, setLoading] = useState(false)
  const { roles = [], id } = props ?? {}

  const { data } = useQuery({
    queryFn: getRoles,
    queryKey: ["roles"],
  })

  const items = data?.data ?? []

  const { handleSubmit, control } = useForm<TSchemaRoleUser>({
    defaultValues: {
      roles: roles.map((_) => _.id),
    },
    resolver: resolverSchemaRoleUser,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      await updateUserRole({ id, oldRoles: roles.map((_) => _.id), newRoles: values.roles })
      setLoading(false)
    }
  })

  function close() {
    dispatchRoleAdditionUser()
  }

  return (
    <form className="w-full flex flex-col gap-5 px-4 items-center" onSubmit={onSubmit}>
      <Controller
        name="roles"
        control={control}
        render={({ field: { value: values, onChange } }) => (
          <fieldset className="w-full flex flex-col gap-3 max-w-[24.375rem]">
            {items.map((item) => (
              <div
                className={cx(
                  "w-full grid grid-cols-[1rem_minmax(0,1fr)] gap-2.5 items-center",
                  item.title === ETitleRole.SuperAdmin ? "cursor-no-drop" : "cursor-pointer",
                )}
                key={`df-er-4-5-${item.id}`}
                onClick={() => {
                  if (item.title === ETitleRole.SuperAdmin) return
                  if (values.includes(item.id)) {
                    const filter = values.filter((_) => _ !== item.id)
                    onChange(filter)
                  } else {
                    onChange([...values, item.id])
                  }
                }}
              >
                <button
                  type="button"
                  className={cx(
                    "relative w-4 h-4 flex transition-colors rounded-[0.25rem] border border-solid cursor-pointer disabled:cursor-not-allowed",
                    values.includes(item.id)
                      ? "*:opacity-100 bg-element-accent-1 border-element-accent-1"
                      : "*:opacity-0 bg-transparent border-text-disabled",
                  )}
                  disabled={item.title === ETitleRole.SuperAdmin}
                >
                  <IconSprite id="icon-check" className="text-text-button w-4 h-4 transition-opacity" />
                </button>
                <span
                  className={cx("text-sm font-normal", item.title === ETitleRole.SuperAdmin ? "text-text-disabled" : "text-text-primary")}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </fieldset>
        )}
      />
      <footer className="w-full flex flex-col md:flex-row-reverse gap-3 max-w-[24.375rem] items-center">
        <Button type="submit" typeButton="fill-primary" label="Обновить" />
        <Button type="button" typeButton="regular-primary" label="Отмена" onClick={close} />
      </footer>
    </form>
  )
}

FormRoleAddition.displayName = "FormRoleAddition"
export default FormRoleAddition
