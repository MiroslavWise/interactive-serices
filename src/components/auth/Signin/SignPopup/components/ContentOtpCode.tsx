"use client"

import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react"
import { useForm } from "react-hook-form"
import type { TContentOtpCode } from "../types"

import styles from "./style.module.scss"
import { ButtonFill } from "@/components/common/Buttons"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

interface IValues {
  input1: string
  input2: string
  input3: string
  input4: string
  input5: string
  input6: string
}

export const ContentOtpCode: TContentOtpCode = ({ setType, setVisible }) => {
  const [loading, setLoading] = useState(false)
  //todo
  const [inputValues, setInputValues] = useState(Array(6).fill(""))
  const [errorCode, setErrorCode] = useState("")
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<IValues>({
    defaultValues: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    }
  })

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

  const onOtpCode = (values: IValues) => {
  }

  const onInputValues = () => {
    setLoading(true)
    useTokenHelper.serviceOtp(inputValues.join(""))
      .then(response => {
        if (response.ok) {
          setVisible(false)
          setErrorCode("")
        }
        if (!response.ok) {
          if (response.error?.code === 401 && response?.error?.message === "2fa code is not correct") {
            setErrorCode("Код, введённый вами, не является действительным!")
          }
        }
      })
      .finally(() => {
        setLoading(false)
      })

  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <div className={styles.contentOtpCode}>
      <form
        className="w-100"
        onSubmit={handleSubmit(onOtpCode)}
      >
        <div className={styles.inputs}>
          {inputValues.map((_, index) => (
            <input
              key={index}
              {...register("input" + (index + 1) as any, { required: true })}
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
        {errorCode ? <p className="error-p" style={{marginTop: -15, marginBottom: -15}}>{errorCode}</p> : null}
        <ButtonFill
          disabled={loading || inputValues.filter(item => item !== "").length !== 6}
          label="Подтвердить код"
          classNames="w-100"
          type="primary"
          submit="submit"
          handleClick={onInputValues}
        />
      </form>
    </div>
  )
}