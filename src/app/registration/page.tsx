"use client"

import { EnumSign } from "@/types/enum"

import useUtm from "@/helpers/use-utm"
import { dispatchAuthModal } from "@/store"

export default () => {
  useUtm("/", () => dispatchAuthModal({ visible: true, type: EnumSign.SignUp }))

  return null
}
