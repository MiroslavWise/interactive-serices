import { memo, useMemo, useState } from "react"
import { type Control, Controller, UseFormSetValue } from "react-hook-form"

import { type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"
import { type TSchemaCreatePostUpdate } from "@/components/templates/CreatePost/schema"

import { cx } from "@/lib/cx"
import { useUpdatePost } from "@/store"
import { queryClient } from "@/context"
import { getGeocodeSearch } from "@/services"
import { useDebounce, useOutsideClickEvent } from "@/helpers"

interface IProps {
  control: Control<TSchemaCreatePostUpdate, any>
  setValue: UseFormSetValue<TSchemaCreatePostUpdate>
}

function AddressController({ control, setValue }: IProps) {
  const post = useUpdatePost(({ data }) => data)

  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const debouncedValue = useDebounce(onChangeAddress, 1000)
  const [focusGeo, setFocusGeo, ref] = useOutsideClickEvent()
  const geo = post?.addresses?.[0] || null
  const [inputGeo, setInputGeo] = useState<string>(geo?.additional || "")

  async function onChangeAddress() {
    if (inputGeo?.trim()?.length > 2) {
      const slug = inputGeo?.replaceAll(" ", "-")?.toLowerCase()
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(inputGeo),
        queryKey: ["addresses", { string: slug }],
      })
      setValuesAddresses(response)
    }
  }

  const exactAddresses = useMemo(() => {
    if (!valuesAddresses) {
      return null
    }
    return valuesAddresses?.response?.GeoObjectCollection?.featureMember || null
  }, [valuesAddresses])

  return (
    <Controller
      name="address"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <fieldset className="w-full flex flex-col gap-2">
          <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
            Адрес
          </label>
          <div className="w-full h-12 relative" ref={ref}>
            <input
              type="text"
              placeholder="Введите адрес"
              className={cx(
                "w-full p-3.5 rounded-3xl border border-solid  text-text-primary placeholder:text-text-secondary disabled:text-text-disabled text-sm font-normal",
                !!error ? "border-text-error" : "border-grey-stroke focus:border-element-accent-1",
              )}
              value={inputGeo}
              onChange={(event) => {
                setInputGeo(event.target.value)
                debouncedValue()
              }}
              onClick={(event) => {
                event.stopPropagation()
                setFocusGeo(true)
              }}
            />
            <article
              className={cx(
                "absolute top-[calc(100%_+_0.25rem)] w-full bg-BG-second shadow-box-down max-h-[12.375rem] rounded-xl overflow-hidden overflow-y-auto",
                focusGeo && exactAddresses ? "flex z-50 opacity-100 visible" : "hidden -z-10 opacity-0 invisible",
              )}
            >
              <ul className="w-full flex flex-col overflow-x-hidden h-fit p-1">
                {focusGeo && exactAddresses
                  ? exactAddresses.map((item) => (
                      <li
                        key={`:ley:address:${item.GeoObject.uri}:`}
                        className="w-full p-2 pb-2.5 rounded-lg flex flex-row hover:bg-grey-field cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation()
                          setValue("addressFeature", item!)
                          setInputGeo(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                          setFocusGeo(false)
                        }}
                      >
                        <p className="text-text-primary text-sm font-normal">{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</p>
                      </li>
                    ))
                  : null}
              </ul>
            </article>
          </div>
          {!!error && <i className="-mt-1 text-text-error text-xs font-normal">{error?.message ?? "Ошибка"}</i>}
        </fieldset>
      )}
    />
  )
}

AddressController.displayName = "AddressController"
export default memo(AddressController)
