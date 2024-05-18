import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useUTM = create(persist<IStateUTM>(() => ({}), { name: "::sheira-utm::", storage: createJSONStorage(() => sessionStorage) }))

export const dispatchUTMData = (values: IStateUTM) =>
  useUTM.setState(
    (_) => ({
      ...values,
    }),
    true,
  )

export interface IStateUTM {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
}
