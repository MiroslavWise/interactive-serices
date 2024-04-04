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
      <header>
        <h3>Редактирование профиля</h3>
      </header>
      <article>
        <Segments VALUES={SEGMENTS} active={active} setActive={setActive} isBorder type="primary" />
      </article>
      {active.value === "personal-data" ? <PersonalData /> : active.value === "login-details" ? <LoginDetails /> : null}
    </>
  )
}
