"use client"

import { dispatchClearAuth } from "@/store"

export const useOut = () => {
  function out() {
    dispatchClearAuth()
  }

  return { out }
}
