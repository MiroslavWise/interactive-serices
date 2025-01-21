"use client"

import ComponentItemUser from "./ComponentItemUser"

import { cx } from "@/lib/cx"
import { useContextCompany } from "./ContextCompany"

import styles from "../styles/form.module.scss"

function ComponentUsers() {
  const { users, company } = useContextCompany()
  const { owner } = company ?? {}

  return (
    <ul className={cx("w-full h-full py-5 overflow-y-scroll flex flex-col gap-3 pr-5", styles.ul)}>
      <h3 className="text-xl font-semibold text-text-primary">Глава компании</h3>
      {owner ? <ComponentItemUser user={owner} /> : null}
      <div className="w-full h-[1px] bg-grey-stroke-light" />
      {users.map((item) => (
        <ComponentItemUser key={`dsf;;dfs;;sdf;-${item?.id}`} user={item} />
      ))}
    </ul>
  )
}

ComponentUsers.displayName = "ComponentUsers"
export default ComponentUsers
