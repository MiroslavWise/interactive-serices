"use client"

import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react"

import type { TContentOtpCode } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useAuth } from "@/store/hooks/useAuth"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import { usersService } from "@/services/users"

import styles from "../styles/style.module.scss"

export const ContentOtpCode: TContentOtpCode = ({  }) => {
  const { setToken, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const {setVisibleAndType} = useVisibleAndTypeAuthModal()
  //todo
  const [inputValues, setInputValues] = useState(Array(6).fill(""))
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
    useTokenHelper.serviceOtp({ code: inputValues.join("") })
      .then(response => {
        if (response.ok) {
          usersService.getUserId(response?.res?.id!).then(data => {
            setErrorCode("")
            setToken({
              ok: true,
              token: response?.res?.access_token!,
              refreshToken: response?.res?.refresh_token!,
              userId: response?.res?.id!,
              expiration: response?.res?.expires_in!,
            })
            if (!data?.res?.profile) {
              setVisibleAndType({ type: "PersonalEntry" })
              return
            }
            if (!!data?.res?.profile) {
              const { firstName, lastName, username, about, birthdate, enabled, id } = data?.res?.profile ?? {}
              setUser({
                firstName: firstName,
                lastName: lastName,
                username: username,
                birthdate: birthdate,
                about: about,
                enabled: enabled,
                profileId: id,
              })
            }
            setVisibleAndType({ type: null, visible: false })
            return
          })
        }
        if (!response.ok) {
          if (response.error?.code === 401 && response?.error?.message === "2fa code is not correct") {
            setErrorCode("Код, введённый вами, не является действительным!")
          }
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <div className={styles.contentOtpCode}>
      <div className={styles.inputs}>
        {inputValues.map((_, index) => (
          <input
            key={index}
            // @ts-ignore
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            placeholder={"0"}
            pattern="/[0-9]/"
            maxLength={1}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => {
              setInputValues(Array(6).fill(""))
              inputRefs.current[0].focus()
            }}
          />
        ))}
      </div>
      {errorCode ? <p className="error-p" style={{ marginTop: -15, marginBottom: -15 }}>{errorCode}</p> : null}
      <ButtonFill
        disabled={loading || inputValues.filter(item => item !== "").length !== 6}
        label="Подтвердить код"
        classNames="w-100"
        type="primary"
        submit="submit"
        handleClick={onInputValues}
      />
    </div>
  )
}