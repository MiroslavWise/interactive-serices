"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Button from "@/components/common/Button"

import { getCompanyId, patchCompany } from "@/services/companies"
import { dispatchUpdateCompanyClose, useUpdateCompany } from "@/store"

function UpdateCompanyEnabled() {
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
      await patchCompany({ enabled: false }, targetId!)
      refetch()
      setLoading(false)
    }
  }

  return (
    <>
      <article>
        <div data-img>
          <img src="/svg/trash-accent.svg" alt="trash" width={20} height={20} />
        </div>
        <h2>Вы хотите деактивировать Компанию?</h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, деактивировать" onClick={handle} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={dispatchUpdateCompanyClose} loading={loading} />
      </footer>
    </>
  )
}

export default UpdateCompanyEnabled
