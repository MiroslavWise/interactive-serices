"use client"

import { useState } from "react"

import { Segments } from "@/components/common"
import { LoginDetails } from "./components/LoginDetails"
import { PersonalData } from "./components/PersonalData"

import { SEGMENTS } from "./constants/segments"

export default function UpdateProfile() {
  const [active, setActive] = useState(SEGMENTS[0])

  return (
    <>
      <header className="h-[var(--height-standard-header-modal)] p-5 md:pt-6 max-md:pb-4 flex items-center justify-center border-b border-solid border-grey-separator">
        <h3 className="text-text-primary text-center text-2xl font-semibold">Редактирование профиля</h3>
      </header>
      <article data-test="article-modal-update-profile" className="w-full py-5 px-6 h-[5.25rem]">
        <Segments VALUES={SEGMENTS} active={active} setActive={setActive} isBorder type="primary" />
      </article>
      {active.value === "personal-data" ? <PersonalData /> : active.value === "login-details" ? <LoginDetails /> : null}
    </>
  )
}
