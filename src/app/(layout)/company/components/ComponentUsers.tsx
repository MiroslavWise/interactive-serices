"use client"

import ComponentAddUser from "./ComponentAddUser"
import ComponentItemUser from "./ComponentItemUser"

import { cx } from "@/lib/cx"
import { useContextCompany } from "./ContextCompany"

import sImg from "../styles/spinner.module.scss"
import styles from "../styles/form.module.scss"

function ComponentUsers() {
  const { users, company, isLoading } = useContextCompany()
  const { owner } = company ?? {}

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
        <ComponentItemUser key={`dsf;;dfs;;sdf;-${item?.id}`} user={item} />
      ))}
    </ul>
  )
}

ComponentUsers.displayName = "ComponentUsers"
export default ComponentUsers
