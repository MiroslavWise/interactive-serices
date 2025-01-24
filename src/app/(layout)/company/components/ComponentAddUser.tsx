import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { IUserOffer } from "@/services/offers/types"

import Button from "@/components/common/Button"

import { useContextCompany } from "./ContextCompany"
import { patchCompanyUsers } from "@/services/companies"
import { resolverSchemaUsers, TSchemaUsers } from "../utils/schema"

interface IProps {
  id: number
  users: IUserOffer[]
}

function ComponentAddUser({ users, id }: IProps) {
  const { refetch } = useContextCompany()
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control } = useForm<TSchemaUsers>({
    defaultValues: {
      id: "",
    },
    resolver: resolverSchemaUsers,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const newUsers = Array.from(new Set([...users.map((_) => _.id), Number(values.id)]))
      await patchCompanyUsers(newUsers, id)
      await refetch()
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 p-5 rounded-2 bg-BG-first border border-grey-stroke-light">
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="w-full flex flex-col gap-1">
            <label className="text-sm text-text-primary font-medium">
              <span className="text-text-accent">id</span> пользователя, которого хотите добавить к компанию
            </label>
            <input
              className="w-full"
              type="number"
              pattern="\d*"
              value={field.value}
              placeholder="Введите id пользователя"
              onChange={(event) => field.onChange(event.target.value.replace(/[^0-9]/g, ""))}
              data-error={!!error?.message}
            />
          </fieldset>
        )}
      />
      <footer className="w-full flex justify-end">
        <Button label="Добавить" loading={loading} disabled={loading} className="w-fit" />
      </footer>
    </form>
  )
}

export default ComponentAddUser
