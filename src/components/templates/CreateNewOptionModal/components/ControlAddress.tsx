import { useMemo, useState } from "react"
import { Control, Controller, UseFormTrigger, UseFormSetValue, FieldErrors } from "react-hook-form"

import { queryClient } from "@/context"
import { getGeocodeSearch } from "@/services"
import { TSchemaCreate } from "../utils/create.schema"
import IconXClose from "@/components/icons/IconXClose"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"
import { dispatchValidating, EModalData, useModal, useNewServicesBannerMap, useOnboarding } from "@/store"

interface IProps {
  control: Control<TSchemaCreate, any>
  watch: string
  trigger: UseFormTrigger<TSchemaCreate>
  setValue: UseFormSetValue<TSchemaCreate>
  errors: FieldErrors<TSchemaCreate>
}

function ControlAddress({ control, watch, trigger, setValue, errors }: IProps) {
  const step = useOnboarding(({ step }) => step)
  const visible = useOnboarding(({ visible }) => visible)
  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useNewServicesBannerMap(({ addressInit }) => addressInit)
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const debouncedValue = useDebounce(onChangeAddress, 750)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)

  async function onChangeAddress() {
    if (watch?.length > 2 && isFocus) {
      const slug = watch?.replaceAll(" ", "-")!?.toLowerCase()
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(watch),
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

    const addresses = valuesAddresses?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
      ["RU", "BY"].includes(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.country_code!),
    )

    return Array.isArray(addresses) && addresses?.length > 0 ? addresses : null
  }, [valuesAddresses])

  const isEmptySearch = !loadingAddresses && Array.isArray(valuesAddresses?.response?.GeoObjectCollection?.featureMember)
  const focusAddress = () => setIsFocus(true)
  const blurAddress = () => setIsFocus(false)

  return (
    <Controller
      name="address"
      control={control}
      rules={{
        required: stateModal === EModalData.CreateNewOptionModal,
      }}
      render={({ field, fieldState: { error } }) => (
        <fieldset
          id="fieldset-create-option-modal-address"
          style={{ zIndex: 100 }}
          data-test="fieldset-create-new-option-addressInit"
          ref={ref}
        >
          <label htmlFor={field.name} title="Ваш адрес">
            Ваш адрес
          </label>
          <div data-input-selector>
            <input
              {...field}
              onChange={(event) => {
                field.onChange(event.target.value)
                debouncedValue()
                setLoadingAddresses(true)
              }}
              value={stateModal === EModalData.CreateNewOptionModalMap ? initMapAddress?.additional : field.value}
              type="text"
              data-error={!!errors.addressFeature}
              onFocus={focusAddress}
              placeholder="Введите адрес"
              disabled={(visible && step !== 2) || (stateModal === EModalData.CreateNewOptionModalMap && !!initMapAddress)}
              data-focus={visible && step === 2}
              autoComplete="off"
            />
            <button
              data-select-icon={isFocus}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                field.onChange("")
                blurAddress()
              }}
            >
              <IconXClose />
            </button>
            <ul
              data-active={isFocus && (isEmptySearch || Array.isArray(exactAddresses))}
              data-is-empty-search={isEmptySearch}
              className="absolute left-0 right-0 overflow-hidden overflow-y-auto flex flex-col w-full -translate-y-full"
            >
              {Array.isArray(exactAddresses) ? (
                exactAddresses.map((item, index) => (
                  <li
                    key={`${item.GeoObject.uri}-${index}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      dispatchValidating({
                        isAddress: !!item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!,
                      })
                      field.onChange(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                      setValue("addressFeature", item)
                      blurAddress()
                      trigger("address")
                      trigger("addressFeature")
                    }}
                  >
                    <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                  </li>
                ))
              ) : isEmptySearch ? (
                <p>По вашему запросу нет подходящих адресов</p>
              ) : null}
            </ul>
          </div>
          {!!error || !!errors.addressFeature ? <i>Выберите существующий адрес</i> : null}
        </fieldset>
      )}
    />
  )
}

ControlAddress.displayName = "ControlAddress"
export default ControlAddress
