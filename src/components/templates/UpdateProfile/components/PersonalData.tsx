import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { IPatchProfileData, IPostProfileData } from "@/services/profile/types"
import { resolverUpdateForm, TGenderForm, TSchemaUpdateForm } from "../utils/update-form.schema"

import { ImageProfile } from "./ImageProfile"
import { ButtonsFooter } from "./ButtonsFooter"

import { useToast } from "@/helpers/hooks/useToast"
import { dispatchModalClose, useAuth } from "@/store"
import { useOut, useOutsideClickEvent } from "@/helpers"
import { fileUploadService, getUserId, serviceAuthErrors, serviceProfile } from "@/services"

const GENDER: { label: string; value: TGenderForm | null }[] = [
  {
    label: "Не определён",
    value: null,
  },
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
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const [errorFile, setErrorFile] = useState<null | string>(null)
  const { out } = useOut()
  const { on } = useToast()
  const [file, setFile] = useState<{
    file: File | null
    string: string
  }>({ file: null, string: "" })
  const [focusGender, setFocusGender, ref] = useOutsideClickEvent()

  const { data, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: res } = data ?? {}
  const { profile } = res ?? {}

  const {
    watch,
    setValue,
    setError,
    handleSubmit,
    trigger,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<TSchemaUpdateForm>({
    defaultValues: {
      username:
        (profile?.username ?? "").includes("$") || (profile?.username ?? "").includes("/") ? undefined : profile?.username ?? undefined,
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? undefined,
      gender: null,
    },
    resolver: resolverUpdateForm,
  })

  const image = profile?.image?.attributes?.url

  useEffect(() => {
    if (!!profile) {
      if (profile?.firstName) {
        setValue("firstName", profile?.firstName!)
      }
      if (profile?.lastName) {
        setValue("lastName", profile?.lastName!)
      }
      if (profile?.username) {
        setValue(
          "username",
          ((profile?.username as unknown as any) ?? "").includes("$") || ((profile?.username as unknown as any) ?? "").includes("/")
            ? undefined
            : (profile?.username! as unknown as any),
        )
      }
      if (profile?.gender) {
        setValue("gender", profile?.gender!)
      }
    }
  }, [profile])

  async function UpdatePhotoProfile(id: number) {
    return fileUploadService(file.file!, {
      type: EnumTypeProvider.profile,
      userId: userId!,
      idSupplements: id!,
    })
  }

  function submit(values: TSchemaUpdateForm) {
    if (!loading) {
      setLoading(true)

      const valuesProfile: IPatchProfileData = {
        enabled: true,
      }
      const firstName = values.firstName.trim()
      if (firstName !== profile?.firstName && firstName) {
        valuesProfile.firstName = firstName
      }
      const lastName = values.lastName.trim()
      if (lastName !== profile?.lastName && lastName) {
        valuesProfile.lastName = lastName
      }
      const username = values.username?.trim()
      if (username !== profile?.username && username) {
        valuesProfile.username = username?.replace("@", "")
      }
      const gender = values.gender
      if (gender !== profile?.gender && gender && ["f", "m"].includes(gender)) {
        valuesProfile.gender = gender
      }

      if (Object.keys(valuesProfile).length === 1 && !file.string) {
        setLoading(false)
        dispatchModalClose()
        return
      }

      Promise.resolve(!!profile ? serviceProfile.patch(valuesProfile) : serviceProfile.post(valuesProfile!)).then((responseOk) => {
        if (!!responseOk?.data) {
          const idProfile = userId!
          if (file.file) {
            UpdatePhotoProfile(idProfile).then((response) => {
              if (response?.data) {
                const dataPatch: IPostProfileData = { imageId: response?.data?.id }
                serviceProfile.patch(dataPatch).then(() => {
                  refetch()
                  dispatchModalClose()
                })
              } else {
                if (response?.error?.message?.toLowerCase()?.includes("request entity too large") || response?.error?.code === 413) {
                  setErrorFile(serviceAuthErrors.get("request entity too large") || null)
                }
              }
            })
          } else {
            refetch()
            dispatchModalClose()
          }
        } else {
          setLoading(false)
          if (responseOk?.error?.code === 409 || responseOk?.error?.message === "username already exists") {
            return setError("username", { message: "Пользователь с таким ником уже существует" })
          }
          if (responseOk?.error?.code === 401) {
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

  return (
    <form onSubmit={onSubmit} data-test="form-personal-data">
      <section>
        <ImageProfile image={image!} file={file} setFile={setFile} refetch={refetch} errorFile={errorFile} setErrorFile={setErrorFile} />
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
                <input
                  type="text"
                  placeholder="Введите имя"
                  {...field}
                  onChange={(event) => field.onChange(event.target.value.replace(/[\-]{2,}/g, "-"))}
                  data-error={!!error}
                  data-test="input-personal-data-firstName"
                />
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
                <input
                  type="text"
                  placeholder="Введите фамилию"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => field.onChange(event.target.value.replace(/[\-]{2,}/g, "-"))}
                  data-error={!!error}
                  data-test="input-personal-data-lastName"
                />
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
                <input
                  type="text"
                  placeholder="Придумайте ник"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => {
                    field.onChange(event.target.value.replaceAll("/", ""))
                    trigger(field.name)
                  }}
                  data-error={!!error}
                  data-test="input-personal-data-username"
                />
                {!!error ? <i>{error?.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-personal-data-gender">
                <label htmlFor={field.name} {...field} title="Пол пользователя">
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
                    data-error={!!error}
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
                              field.onChange(item.value)
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
                {!!error ? <i>{error?.message}</i> : null}
              </fieldset>
            )}
          />
        </div>
      </section>
      <ButtonsFooter loading={loading} />
    </form>
  )
}
