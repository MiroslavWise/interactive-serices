import { useState } from "react"
import { useForm } from "react-hook-form"
import { getProfileUserId } from "@/services"
import { useQuery } from "@tanstack/react-query"

import { IValuesForm } from "../types/types"

import { ImageProfile } from "./ImageProfile"
import { FieldAddress } from "./FieldAddress"
import { ButtonsFooter } from "./ButtonsFooter"

import { useAuth } from "@/store"
import { useOutsideClickEvent } from "@/helpers"

const GENDER: { label: string; value: "male" | "female" }[] = [
  {
    label: "Мужской",
    value: "male",
  },
  {
    label: "Женский",
    value: "female",
  },
]

export const PersonalData = () => {
  const userId = useAuth(({ userId }) => userId)
  const [file, setFile] = useState<{
    file: File | null
    string: string
  }>({ file: null, string: "" })
  const [focusGender, setFocusGender, ref] = useOutsideClickEvent()

  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IValuesForm>({})

  const { data, refetch } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId!],
    enabled: !!userId,
  })

  const image = data?.res?.image?.attributes?.url
  const idProfile = data?.res?.id!

  return (
    <form>
      <section>
        <ImageProfile image={image!} file={file} setFile={setFile} idProfile={idProfile} refetch={refetch} />
        <div data-grid>
          <fieldset>
            <label>Имя</label>
            <input type="text" placeholder="Введите имя" {...register("firstName", { required: true })} data-error={!!errors?.firstName} />
          </fieldset>
          <fieldset>
            <label>Фамилия</label>
            <input
              type="text"
              placeholder="Введите фамилию"
              {...register("lastName", { required: true })}
              data-error={!!errors?.lastName}
            />
          </fieldset>
          <fieldset>
            <label>Ник</label>
            <input type="text" placeholder="Придумайте ник" {...register("username", { required: true })} data-error={!!errors.username} />
          </fieldset>
          <fieldset>
            <label>Пол</label>
            <div data-input ref={ref} style={{ zIndex: 20 }}>
              <input
                type="text"
                placeholder="Выберите пол"
                onClick={(event) => {
                  event.stopPropagation()
                  setFocusGender(true)
                }}
                value={GENDER.find((item) => item.value === watch("gender"))?.label || ""}
                {...register("gender")}
                readOnly
              />
              {focusGender ? (
                <ul>
                  {GENDER.map((item) => (
                    <li
                      key={`::key::gender::${item.value}::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setFocusGender(false)
                        setValue("gender", item.value)
                      }}
                    >
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </fieldset>
        </div>
        <FieldAddress />
      </section>
      <ButtonsFooter />
    </form>
  )
}
