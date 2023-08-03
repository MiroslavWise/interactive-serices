"use client"

import { MotionUL } from "@/components/common/Motion"
import { CardSuggestion } from "@/components/common/Card"

import { MY_SUGGESTIONS } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions = () => {

  return (
    <MotionUL classNames={[styles.containerSuggestions]}>
      {
        MY_SUGGESTIONS.map((item, index) => (
          <CardSuggestion
            key={`${index}_sug_${index}`}
            {...item}
          />
        ))
      }
    </MotionUL>
  )
}