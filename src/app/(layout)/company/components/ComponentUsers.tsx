"use client"

import { cx } from "@/lib/cx"
import ComponentItemUser from "./ComponentItemUser"

import styles from "../styles/form.module.scss"

function ComponentUsers() {
  const users: any[] = ["_", 1, 2, 3, 4, 5]

  return (
    <ul className={cx("w-full h-full py-5 overflow-y-scroll flex flex-col gap-3", styles.ul)}>
      {users.map((item) => (
        <ComponentItemUser key={`dsf;;dfs;;sdf;`} />
      ))}
    </ul>
  )
}

ComponentUsers.displayName = "ComponentUsers"
export default ComponentUsers
