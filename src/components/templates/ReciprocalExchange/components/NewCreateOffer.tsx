"use client"

import { memo, useMemo, useState } from "react"
import { useFormContext, Controller } from "react-hook-form"

import { ETypeOfNewCreated, type IFormValues } from "../types/types"
import { type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import ControllerCategory from "./ControllerCategory"
import IconChevronDown from "@/components/icons/IconChevronDown"

import { fetchQuery } from "@/context"
import { getGeocodeSearch } from "@/services"
import { useDebounce, useOutsideClickEvent } from "@/helpers"

import styles from "../styles/new-create-offer.module.scss"

export const NewCreateOffer = memo(({}: IProps) => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext<IFormValues>()
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()

  async function onChangeAddress() {
    if (watch("address") && watch("address")!?.length > 2 && isFocus) {
      const slug = watch("address")?.replaceAll(" ", "-")?.toLowerCase()
      const response = await fetchQuery({
        queryFn: () => getGeocodeSearch(watch("address")!),
        queryKey: ["addresses", { string: slug }],
      })

      setValuesAddresses(response)
      setLoadingAddresses(false)
    }
  }

  const exactAddresses = useMemo(() => {
    if (!valuesAddresses) {
      return null
    }
    return valuesAddresses?.response?.GeoObjectCollection?.featureMember || null
  }, [valuesAddresses])

  return (
    <div className={styles.container}>
      <ControllerCategory control={control} />
      <Controller
        name="description_new_offer"
        control={control}
        rules={{
          required: watch("select_new_proposal") === ETypeOfNewCreated.new,
          minLength: 1,
          maxLength: 512,
        }}
        render={({ field, fieldState: { error } }) => (
          <fieldset>
            <label htmlFor={field.name}>Описание предложения</label>
            <div data-text-area>
              <textarea
                value={field.value}
                placeholder="Описание предложения..."
                minLength={1}
                maxLength={512}
                onChange={(event) => setValue("description_new_offer", event.target.value.replaceAll(/\s{2,}/g, " "))}
                data-error={!!error}
              />
              <span>{field.value?.length || 0}/512</span>
            </div>
            {!!errors?.description_new_offer ? (
              ["required", "minLength"].includes(errors?.description_new_offer?.type) ? (
                <i>Это поле не может оставаться пустым</i>
              ) : errors?.description_new_offer?.type === "maxLength" ? (
                <i>Не более 512 символов</i>
              ) : (
                <i>{errors?.description_new_offer?.message}</i>
              )
            ) : null}
          </fieldset>
        )}
      />
      <fieldset data-address>
        <label>Ваш адрес</label>
        <div
          data-input-selector
          {...register("addressFeature", { required: !!watch("check") && watch("select_new_proposal") === ETypeOfNewCreated.new })}
          ref={ref}
        >
          <input
            {...register("address", { required: true })}
            onChange={(event) => {
              setValue("address", event.target.value)
              debouncedValue()
              setLoadingAddresses(true)
            }}
            type="text"
            data-error={!!errors.addressFeature}
            onFocus={() => setIsFocus(true)}
            placeholder={"Введите адрес"}
            autoComplete="off"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 right-3.5 cursor-pointer w-5 h-5 *:w-5 *:h-5"
            onClick={(event) => {
              event.stopPropagation()
              setIsFocus((_) => !_)
            }}
          >
            <IconChevronDown />
          </div>
          <ul data-active={isFocus}>
            {Array.isArray(exactAddresses) ? (
              exactAddresses.map((item, index) => (
                <li
                  key={`${item.GeoObject.uri}-${index}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setValue("addressFeature", item)
                    setValue("address", item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                    setIsFocus(false)
                  }}
                >
                  <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                </li>
              ))
            ) : (
              <p>{loadingAddresses ? "Идёт загрузка адресов" : "Не найдено подходящих адресов"}</p>
            )}
          </ul>
        </div>
      </fieldset>
      <fieldset>
        <span
          data-check
          onClick={(event) => {
            event.stopPropagation()
            setValue("check", !watch("check"))
          }}
        >
          <div data-div-check={!!watch("check")} />
          <label>Видно всем</label>
        </span>
      </fieldset>
    </div>
  )
})

interface IProps {}
