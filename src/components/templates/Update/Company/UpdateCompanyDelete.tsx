"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Button from "@/components/common/Button"

import { deleteCompanyId, getCompanyId } from "@/services/companies"
import { dispatchUpdateCompanyClose, useUpdateCompany } from "@/store"

function UpdateCompanyDelete() {
  const [loading, setLoading] = useState(false)
  const targetId = useUpdateCompany(({ targetId }) => targetId)

  const { refetch } = useQuery({
    queryFn: () => getCompanyId(targetId!),
    queryKey: ["company", targetId],
    enabled: false,
  })

  async function handle() {
    if (!loading) {
      setLoading(true)
      await deleteCompanyId(targetId!)
      refetch()
      dispatchUpdateCompanyClose()
      setLoading(false)
    }
  }

  return (
    <>
      <article>
        <div data-img>
          <img src="/svg/trash-accent.svg" alt="trash" width={20} height={20} />
        </div>
        <h2>Вы хотите удалить Компанию?</h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handle} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={dispatchUpdateCompanyClose} loading={loading} />
      </footer>
    </>
  )
}

export default UpdateCompanyDelete
