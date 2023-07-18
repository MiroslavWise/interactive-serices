import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react"
import { motion } from "framer-motion"

import type { TContentCodeVerification } from "./types/types"

import styles from "../styles/style.module.scss"
import { ButtonFill } from "@/components/common/Buttons"

export const ContentCodeVerification: TContentCodeVerification = ({ setType, typeVerification }) => {
  const [loading, setLoading] = useState(false)
  const [inputValues, setInputValues] = useState(Array(4).fill(""))
  const [errorCode, setErrorCode] = useState("")
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target
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
    setLoading(true)
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <motion.div
      className={styles.contentOtpCode}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.inputs}>
        {inputValues.map((_, index) => (
          <input
            className={styles.checking}
            key={index}
            // @ts-ignore
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            placeholder={"0"}
            pattern="/[0-9]/"
            maxLength={1}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>
      {errorCode ? <p className="error-p" style={{ marginTop: -15, marginBottom: -15 }}>{errorCode}</p> : null}
      <ButtonFill
        disabled={loading || inputValues.filter(item => item !== "").length !== 4}
        label={`Подтвердить ${typeVerification === "email" ? "email" : typeVerification === "phone" ? "номер" : ""}`}
        classNames="w-100"
        type="primary"
        submit="submit"
        handleClick={onInputValues}
      />
      <section className={styles.Register}>
        <p>Не получили {typeVerification === "email" ? "email" : typeVerification === "phone" ? "код" : ""}?</p>
        <a onClick={() => setType("ForgotPassword")}> Отправить еще раз</a>
      </section>
    </motion.div>
  )
}