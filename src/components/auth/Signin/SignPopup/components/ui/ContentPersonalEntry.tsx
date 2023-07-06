import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"

import type { TContentPersonalEntry, IValuesPersonForm } from "./types/types"
import type { IPostProfileData } from "@/services/profile/types/profileService"

import { ButtonFill } from "@/components/common/Buttons"
import { GroupSelectorDate, LabelInputGroup } from "./components/LabelInputGroup"

import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import { profileService } from "@/services/profile"

import styles from "../styles/style.module.scss"



export const ContentPersonalEntry: TContentPersonalEntry = ({ setType, setVisible }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, setError, setValue, watch } = useForm<IValuesPersonForm>()
  const onSubmit = async (values: IValuesPersonForm) => {
    setLoading(true)
    const data: IPostProfileData = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      birthdate: dayjs(`${values.day}/${values.month}/${values.year}`, "DD/MM/YYYY").format("DD/MM/YYYY"),
      about: values.about,
      enabled: true,
      userId: Number(useTokenHelper.authUserId),
    }
    profileService.postProfile(data)
      .then(response => {
        if (response?.code === 409) {
          return setError("username", { message: "user exists" })
        }
        if (response.ok) {
          setVisible(false)
          setType(null)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <LabelInputGroup
          label="Имя"
          rules
          placeholder="Введите своё имя"
          type="text"
          propsInput={register("firstName", { required: true, })}
          errorMessage={errors.firstName ? "Это поле не может быть пустым" : ""}
        />
        <LabelInputGroup
          label="Фамилия"
          rules
          placeholder="Введите свою фаимилию"
          type="text"
          propsInput={register("lastName", { required: true, })}
          errorMessage={errors.lastName ? "Это поле не может быть пустым" : ""}
        />
        <LabelInputGroup
          label="Ник"
          rules
          placeholder="Введите свой никнейм"
          type="text"
          propsInput={register("username", { required: true, })}
          errorMessage={
            (errors.username && errors.username.message === "errors.username.message")
              ? "Этот ник уже занят"
              : errors.username
                ? "Данное поле обязательно"
                : ""
          }
        />
        <GroupSelectorDate
          watchDay={watch("day")}
          watchMonth={watch("month")}
          watchYear={watch("year")}
          propsRegister={{
            day: register("day", { required: true }),
            month: register("month", { required: true }),
            year: register("year", { required: true }),
          }}
          set={setValue}
          errorDate={{
            day: errors.day,
            month: errors.month,
            year: errors.year,
          }}
        />
        <ButtonFill
          disabled={loading}
          label="Продолжить"
          submit="submit"
        />
      </form>
    </motion.div>
  )
}