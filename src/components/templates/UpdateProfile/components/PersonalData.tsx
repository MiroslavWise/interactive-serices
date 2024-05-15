import { Controller, useForm } from "react-hook-form"
import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IPatchProfileData, IPostProfileData } from "@/services/profile/types"
import { resolverUpdateForm, TGenderForm, TSchemaUpdateForm } from "../utils/update-form.schema"

import { ImageProfile } from "./ImageProfile"
import { ButtonsFooter } from "./ButtonsFooter"

import { useToast } from "@/helpers/hooks/useToast"
import { dispatchModalClose, useAuth } from "@/store"
import { useOut, useOutsideClickEvent } from "@/helpers"
import { fileUploadService, getProfile, serviceAuthErrors, serviceProfile } from "@/services"

const GENDER: { label: string; value: TGenderForm }[] = [
  {
    label: "Мужской",
    value: "m",
  },
  {
    label: "Женский",
    value: "f",
  },
]

export const PersonalData = () => {
  const [loading, setLoading] = useState(false)
  const userId = useAuth(({ userId }) => userId)
  const [errorFile, setErrorFile] = useState<null | string>(null)
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
    control,
    clearErrors,
    formState: { errors },
  } = useForm<TSchemaUpdateForm>({
    resolver: resolverUpdateForm,
  })

  const { data, refetch } = useQuery({
    queryFn: () => getProfile(),
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
        setValue("gender", resProfile?.gender!)
      }
    }
  }, [data?.res])

  async function UpdatePhotoProfile(id: number) {
    return fileUploadService(file.file!, {
      type: EnumTypeProvider.profile,
      userId: userId!,
      idSupplements: id!,
    })
  }

  function submit(values: TSchemaUpdateForm) {
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

      if (values.firstName !== data?.res?.firstName) {
        valuesProfile.firstName = values.firstName
      }
      if (values.lastName !== data?.res?.lastName) {
        valuesProfile.lastName = values.lastName
      }
      if (values.username !== data?.res?.username) {
        valuesProfile.username = values.username?.replace("@", "")
      }
      if (values.gender !== data?.res?.gender && ["f", "m"].includes(values.gender!)) {
        valuesProfile.gender = values.gender
      }

      Promise.all([!!data?.ok ? serviceProfile.patch(valuesProfile) : serviceProfile.post(valuesProfile!)]).then((responses) => {
        if (responses?.[0]?.ok) {
          const idProfile = responses?.[0]?.res?.id!
          if (file.file) {
            UpdatePhotoProfile(idProfile).then((response) => {
              if (response?.ok) {
                const dataPatch: IPostProfileData = { imageId: response?.res?.id }
                serviceProfile.patch(dataPatch).then(() => {
                  refetch()
                  requestAnimationFrame(dispatchModalClose)
                })
              } else {
                if (response?.error?.message?.toLowerCase()?.includes("request entity too large") || response?.error?.code === 413) {
                  setErrorFile(serviceAuthErrors.get("request entity too large") || null)
                }
              }
            })
          } else {
            refetch()
            requestAnimationFrame(dispatchModalClose)
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
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  const disabledButton: boolean = useMemo(() => {
    return (
      watch("gender") === data?.res?.gender &&
      watch("firstName") === data?.res?.firstName &&
      watch("lastName") === data?.res?.lastName &&
      watch("username") === data?.res?.username &&
      !file.string
    )
  }, [watch("firstName"), watch("lastName"), watch("username"), data?.res, file.string, watch("gender")])

  return (
    <form onSubmit={onSubmit} data-test="form-personal-data">
      <section>
        <ImageProfile
          image={image!}
          file={file}
          setFile={setFile}
          idProfile={idProfile}
          refetch={refetch}
          errorFile={errorFile}
          setErrorFile={setErrorFile}
        />
        <div data-grid>
          <Controller
            name="firstName"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-personal-data-firstName">
                <label htmlFor={field.name} title="Имя пользователя">
                  Имя
                </label>
                <input type="text" placeholder="Введите имя" {...field} data-error={!!error} data-test="input-personal-data-firstName" />
                {!!error ? <i>{error?.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="lastName"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-personal-data-lastName">
                <label htmlFor={field.name} title="Фамилия пользователя">
                  Фамилия
                </label>
                <input type="text" placeholder="Введите фамилию" {...field} data-error={!!error} data-test="input-personal-data-lastName" />
                {!!error ? <i>{error?.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="username"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-personal-data-username">
                <label htmlFor={field.name} title="Никнейм пользователя">
                  Ник
                </label>
                <input type="text" placeholder="Придумайте ник" {...field} data-error={!!error} data-test="input-personal-data-username" />
                {!!error ? <i>{error?.message}</i> : null}
              </fieldset>
            )}
          />
          <fieldset data-test="fieldset-personal-data-gender">
            <label htmlFor="gender" {...register("gender")} title="Пол пользователя">
              Пол
            </label>
            <div data-input ref={ref} style={{ zIndex: 20 }}>
              <input
                type="text"
                placeholder="Выберите пол"
                readOnly
                onClick={(event) => {
                  event.stopPropagation()
                  setFocusGender(true)
                }}
                data-error={!!errors?.gender}
                value={GENDER.find((item) => item.value === watch("gender"))?.label || ""}
                data-test="input-personal-data-gender"
              />
              {focusGender ? (
                <div data-ul data-test="input-personal-data-gender-div-ul">
                  <ul data-test="input-personal-data-gender-list-ul">
                    {GENDER.map((item) => (
                      <li
                        key={`::key::gender::${item.value}::`}
                        onClick={(event) => {
                          event.stopPropagation()
                          setFocusGender(false)
                          setValue("gender", item.value)
                          clearErrors("gender")
                        }}
                        data-test="input-personal-data-gender-list-li"
                      >
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            {!!errors?.gender ? <i>{errors?.gender?.message}</i> : null}
          </fieldset>
        </div>
      </section>
      <ButtonsFooter disabled={disabledButton} loading={loading} />
    </form>
  )
}
