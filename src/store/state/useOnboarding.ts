import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"

import type { IStateUseOnboarding, IValuesInterface, TActionOnboarding } from "../types/typeOnboarding"

export const useOnboarding = create<IStateUseOnboarding>((set, get) => ({
  valid: {
    isAddress: false,
    isCategoryId: false,
    isTitle: false,
    isFiles: false,
  },
  type: null,
  step: 0,
  visible: false,
  isPreClose: false,
}))

export const dispatchOnboardingStart = (value: EnumTypeProvider | null) =>
  useOnboarding.setState((_) => {
    if (value === null) {
      return {
        visible: false,
      }
    } else {
      return {
        visible: true,
        type: value,
        step: 0,
      }
    }
  })

export const dispatchValidating = (values: IValuesInterface) =>
  useOnboarding.setState((_) => ({
    valid: {
      isAddress: typeof values.isAddress === "undefined" ? !!_.valid.isAddress : !!values.isAddress,
      isFiles: typeof values.isFiles === "undefined" ? !!_.valid.isFiles : !!values.isFiles,
      isCategoryId: typeof values?.isCategoryId === "undefined" ? !!_.valid.isCategoryId : !!values.isCategoryId,
      isTitle: typeof values.isTitle === "undefined" ? !!_.valid.isTitle : !!values.isTitle,
    },
  }))

export const dispatchOnboardingContinue = () =>
  useOnboarding.setState((_) => ({
    isPreClose: false,
  }))

export const dispatchOnboardingType = (type: EnumTypeProvider) => useOnboarding.setState((_) => ({ type }))

export const dispatchOnboarding = (values: TActionOnboarding) =>
  useOnboarding.setState((_) => {
    if (values === "next") {
      if (_.step >= 5) {
        return {
          visible: false,
          type: null,
        }
      }
      if ([2, 2.5].includes(_.step)) {
        return {
          step: _.step + 0.5,
        }
      }
      return {
        step: _.step + 1,
      }
    } else if (values === "prev") {
      if (_.step === 0) {
        return {}
      }

      if ([3, 2.5].includes(_.step)) {
        return {
          step: _.step - 0.5,
        }
      }

      return {
        step: _.step - 1,
      }
    } else if (values === "open") {
      return {
        visible: true,
        step: 0,
        type: null,
      }
    } else if (values === "continue") {
      return {
        visible: true,
        step: _.step,
      }
    } else if (values === "close") {
      return {
        isPreClose: false,
        visible: false,
        type: null,
      }
    } else if (values === "pre-close") {
      return {
        isPreClose: true,
      }
    }
    return {}
  })
