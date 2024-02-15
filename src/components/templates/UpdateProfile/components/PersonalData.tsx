import { flushSync } from "react-dom"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { fileUploadService, getProfileUserId, serviceProfile } from "@/services"
import { useQuery } from "@tanstack/react-query"

import { IValuesForm } from "../types/types"

import { ImageProfile } from "./ImageProfile"
import { FieldAddress } from "./FieldAddress"
import { ButtonsFooter } from "./ButtonsFooter"

import { useToast } from "@/helpers/hooks/useToast"
import { dispatchUpdateProfile, useAuth } from "@/store"
import { useOut, useOutsideClickEvent } from "@/helpers"
import { IPatchProfileData, IPostProfileData } from "@/services/profile/types"

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
  const [loading, setLoading] = useState(false)
  const userId = useAuth(({ userId }) => userId)
  const { out } = useOut()
  const { on } = useToast()
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
    handleSubmit,
    formState: { errors },
  } = useForm<IValuesForm>({})

  const { data, refetch } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId!],
    enabled: !!userId,
  })

  const image = data?.res?.image?.attributes?.url
  const idProfile = data?.res?.id!

  useEffect(() => {
    if (data?.ok) {
      if (!!data?.res) {
        const { res: resProfile } = data ?? {}
        setValue("firstName", resProfile?.firstName!)
        setValue("lastName", resProfile?.lastName!)
        setValue("username", resProfile?.username!)
        // setValue("gender", resProfile?.)
      }
    }
  }, [data?.res])

  async function UpdatePhotoProfile(id: number) {
    return fileUploadService(file.file!, {
      type: "profile",
      userId: userId!,
      idSupplements: id!,
    })
  }

  function submit(values: IValuesForm) {
    if (!values.username?.trim()) {
      setError("username", { message: "Обязательно к заполнению" })
      setLoading(false)
      return
    }
    if (!loading) {
      setLoading(true)

      const valuesProfile: IPatchProfileData = {
        enabled: true,
      }

      if (watch("firstName") !== data?.res?.firstName) {
        valuesProfile.firstName = values.firstName
      }
      if (watch("lastName") !== data?.res?.lastName) {
        valuesProfile.lastName = values.lastName
      }
      if (watch("username") !== data?.res?.username) {
        valuesProfile.username = values.username?.replace("@", "")
      }

      Promise.all([!!data?.res?.id ? serviceProfile.patch(valuesProfile, data?.res?.id!) : serviceProfile.post(valuesProfile!)]).then(
        (responses) => {
          if (responses?.[0]?.ok) {
            const idProfile = responses?.[0]?.res?.id!
            if (file.file) {
              UpdatePhotoProfile(idProfile).then((response) => {
                const dataPatch: IPostProfileData = { imageId: response?.res?.id }
                serviceProfile.patch(dataPatch, idProfile).then(() => {
                  refetch()
                  flushSync(() => {
                    dispatchUpdateProfile(false)
                  })
                })
              })
            } else {
              refetch()
              flushSync(() => {
                dispatchUpdateProfile(false)
              })
            }
          } else {
            setLoading(false)
            if (responses[0]?.error?.code === 409) {
              return setError("username", { message: "user exists" })
            }
            if (responses[0]?.error?.code === 401) {
              on({
                message: "Извините, ваш токен истёк. Перезайдите, пожалуйста!",
              })
              out()
            }
          }
        },
      )
    }
  }

  const onSubmit = handleSubmit(submit)

  const disabledButton: boolean = useMemo(() => {
    return (
      watch("firstName") === data?.res?.firstName &&
      watch("lastName") === data?.res?.lastName &&
      watch("username") === data?.res?.username &&
      !file.string
    )
  }, [watch("firstName"), watch("lastName"), watch("username"), data?.res, file.string])

  return (
    <form onSubmit={onSubmit}>
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
                <div data-ul>
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
                </div>
              ) : null}
            </div>
          </fieldset>
        </div>
        <FieldAddress />
      </section>
      <ButtonsFooter disabled={disabledButton} loading={loading} />
    </form>
  )
}
