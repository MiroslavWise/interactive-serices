"use client"

import { useState } from "react"

import ComponentAddUser from "./ComponentAddUser"
import ComponentItemUser from "./ComponentItemUser"

import { cx } from "@/lib/cx"
import { useContextCompany } from "./ContextCompany"
import { patchCompanyUsers } from "@/services/companies"

import styles from "../styles/form.module.scss"
import sImg from "../styles/spinner.module.scss"

function ComponentUsers() {
  const [loading, setLoading] = useState(false)
  const { users, company, isLoading, refetch } = useContextCompany()
  const { owner, id: idCompany } = company ?? {}

  async function onDelete(id: number) {
    if (!loading) {
      setLoading(true)
      const newUsers = users.map((_) => _.id).filter((_) => _ !== id)
      await patchCompanyUsers(newUsers, idCompany!)
      refetch()
      setLoading(false)
    }
  }

  return (
    <ul className={cx("w-full relative h-full py-5 overflow-y-scroll flex flex-col gap-3 pr-5", styles.ul)}>
      {isLoading ? (
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img className={cx("w-20 h-20 rotate-0", sImg.img)} src="/svg/spinner.svg" alt="loading" width={50} height={50} />
        </article>
      ) : null}
      <h3 className="text-xl font-semibold text-text-primary">Глава компании</h3>
      {owner ? <ComponentItemUser user={owner} /> : null}
      {company ? <ComponentAddUser users={users} id={company?.id!} /> : null}
      <div className="w-full h-[1px] bg-grey-stroke-light" />
      {users.map((item) => (
        <ComponentItemUser key={`dsf;;dfs;;sdf;-${item?.id}`} user={item} isCustomer onDelete={onDelete} />
      ))}
    </ul>
  )
}

ComponentUsers.displayName = "ComponentUsers"
export default ComponentUsers
