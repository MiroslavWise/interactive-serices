"use client"

import { memo, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { ETypeOfNewCreated, IFormValues } from "../types/types"
import { ISelectList } from "@/components/common/custom/Select/types"

import { CustomSelect } from "@/components/common/custom"

import { queryClient } from "@/context"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { getGeocodeSearch, getOffersCategories } from "@/services"

import styles from "../styles/new-create-offer.module.scss"

export const NewCreateOffer = memo(({}: IProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IFormValues>()
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()

  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []

  const list = useMemo(() => {
    if (!categories) return []

    return (
      categories.map(
        (item) =>
          ({
            label: item.title,
            value: item.id,
          } as ISelectList),
      ) || []
    )
  }, [categories])

  async function onChangeAddress() {
    if (watch("address") && watch("address")!?.length > 2 && isFocus) {
      const slug = watch("address")?.replaceAll(" ", "-")
      const response = await queryClient.fetchQuery({
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
      <fieldset>
        <label>Предложение</label>
        <CustomSelect
          placeholder="Выберите категории"
          value={watch("categoryId") || null}
          list={list}
          setValue={(value) => {
            if (value) {
              setValue("categoryId", value as number)
            }
          }}
        />
      </fieldset>
      <fieldset>
        <label>Описание предложения</label>
        <div data-text-area>
          <textarea
            {...register("description_new_offer", {
              required: watch("select_new_proposal") === ETypeOfNewCreated.new,
              minLength: 3,
              maxLength: 512,
            })}
            placeholder="Описание предложения..."
            maxLength={512}
          />
          <sup>{watch("description_new_offer")?.length || 0}/512</sup>
          {!!errors.description_new_offer ? (
            errors.description_new_offer.type === "minLength" ? (
              <i>Не менее 3-х символов в описании</i>
            ) : errors.description_new_offer.type === "maxLength" ? (
              <i>Не более 512 символов</i>
            ) : (
              <i>{errors.description_new_offer.message}</i>
            )
          ) : null}
        </div>
      </fieldset>
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
          <div data-select-icon>
            <img
              src={loadingAddresses ? "/svg/loading-02.svg" : "/svg/chevron-down.svg"}
              alt="chevron"
              width={20}
              height={20}
              data-chevron
              data-loading={loadingAddresses}
              onClick={(event) => {
                event.stopPropagation()
                setIsFocus(false)
              }}
            />
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
