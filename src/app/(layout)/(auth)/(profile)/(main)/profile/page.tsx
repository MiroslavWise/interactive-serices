"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"
import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"

import main from "../layout.module.scss"

export default function MyProfilePage() {
  const user = useAuth(({ user }) => user)
  const { push } = useRouter()
  const [userId, setUser] = useQueryState("userId", parseAsInteger)
  const [username, setUsername] = useQueryState("username")
  useEffect(() => {
    if (userId) {
      if (user) {
        if (userId !== user?.id) {
          push(`/user/${userId}${username ? `/${username}` : ""}`)
        }
      }
    } else {
      if (user) {
        setUser(user?.id!)
      }
    }
  }, [userId, user])

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!username) {
        if (user?.profile?.username && !user?.profile?.username.includes(`$`) && !user?.profile?.username.includes("/")) {
          setUsername(user?.profile?.username)
        }
      }
    })
  }, [username, user])

  return (
    <ul className={cx(main.wrapperInsideContainer, main.default, "__container-profile-page__")}>
      <MContainerAboutProfile />
      <ContainerAboutMe />
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </ul>
  )
}
