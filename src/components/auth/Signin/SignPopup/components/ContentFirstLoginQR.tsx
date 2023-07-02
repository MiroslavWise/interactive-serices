"use client"

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react"
import QRCode from "react-qr-code"

import type { TContentFirstLoginQR } from "../types"

import { ButtonFill } from "@/components/common/Buttons"

import styles from "./style.module.scss"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

export const ContentFirstLoginQR: TContentFirstLoginQR = ({ setType, valueSecret, setVisible }) => {
  const [loading, setLoading] = useState(false)
  const [inputValues, setInputValues] = useState(Array(6).fill(""))
  const inputRefs = useRef<HTMLInputElement[]>([])
  const handleCopyText = () => {
    navigator.clipboard.writeText(valueSecret.secret)
      .then(() => {
      })
      .catch((error) => {
      })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    let { value } = event.target

    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)

    if (index < inputRefs.current.length - 1 && value.length > 0) {
      const nextInputRef = inputRefs.current[index + 1]
      nextInputRef.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && index > 0 && inputValues[index] === "") {
      const prevInputRef = inputRefs.current[index - 1]
      prevInputRef.focus()
      const newInputValues = [...inputValues]
      newInputValues[index - 1] = ""
      setInputValues(newInputValues)
    }
  }

  const onInputValues = () => {
    console.log("inputValues: ", inputValues)
    setLoading(true)
    useTokenHelper.serviceOtp(inputValues.join(""))
      .then(response => {
        if (response.ok) {
          setVisible(false)
        }
      })
      .finally(() => {
        setLoading(false)
      })
    
  }

  return (
    <div className={styles.contentFirstLogin}>
      <QRCode
        size={256}
        value={valueSecret.url}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 256 256`}
      />
      <h3 onClick={handleCopyText}>{valueSecret.secret}</h3>
      <div className={styles.inputs}>
        {inputValues.map((_, index) => (
          <input
            key={index}
            //@ts-ignore
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            placeholder={"0"}
            pattern="[0-9]"
            maxLength={1}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>
      <ButtonFill
        disabled={loading || inputValues.filter(item => item !== "").length !== 6}
        classNames="w-100"
        label="Подтвердить код"
        handleClick={onInputValues}
      />
    </div>
  )
}