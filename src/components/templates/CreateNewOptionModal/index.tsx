"use client"

import { AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type IPostOffers } from "@/services/offers/types"

import Button from "@/components/common/Button"
import AddUser from "@/components/common/AddUser"
import ControlHelp from "./components/ControlHelp"
import ControlTitle from "./components/ControlTitle"
import ControlAddress from "./components/ControlAddress"
import ControlFileAppend from "./components/ControlFileAppend"
import ControllerCategory from "./components/ControllerCategory"
import ComponentDescription from "./components/ComponentDescription"

import { transliterateAndReplace } from "@/helpers"
import { createAddress } from "@/helpers/address/create"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import {
  useAddCreateModal,
  closeCreateOffers,
  dispatchModalClose,
  dispatchOnboarding,
  useAuth,
  dispatchModal,
  EModalData,
  useModal,
  useNewServicesBannerMap,
  dispatchOpenPreCloseCreateService,
  createCopyOffer,
} from "@/store"
import {
  type TSchemaCreate,
  resolverAlertAndDiscussion,
  resolverAlertAndDiscussionMap,
  resolverOffer,
  resolverOfferCopy,
  resolverOfferMap,
} from "./utils/create.schema"
import { headerTitle } from "./constants/titles"
import { onDefault } from "./utils/default-values"
import { patchOffer, postOffer, fileUploadService, postAddress, getOffers } from "@/services"

export default function CreateNewOptionModal() {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const { refetch: refetchDataMap } = useMapOffers()
  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useNewServicesBannerMap(({ addressInit }) => addressInit)
  const offer = createCopyOffer(({ offer }) => offer)

  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  function onUploadProgress(value: AxiosProgressEvent, name: FormDataEntryValue | null) {
    setProgress((prev) => ({
      ...prev,
      [String(name)]: value,
    }))
  }

  const { refetch } = useQuery({
    queryFn: () => getOffers({ provider: typeAdd!, order: "DESC", user: userId! }),
    queryKey: ["offers", { userId: userId, provider: typeAdd }],
    enabled: false,
  })

  const defaultValues = onDefault({ offer: offer!, initMapAddress: initMapAddress!, typeAdd: typeAdd!, stateModal: stateModal! })

  const {
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    setError,
    trigger,
    formState: { errors },
  } = useForm<TSchemaCreate>({
    defaultValues: defaultValues,
    resolver: [EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)
      ? stateModal === EModalData.CreateNewOptionModal
        ? resolverAlertAndDiscussion
        : resolverAlertAndDiscussionMap
      : typeAdd === EnumTypeProvider.offer
      ? EModalData.CreateNewOptionModal === stateModal
        ? resolverOffer
        : stateModal! === EModalData.CreateNewOptionModalCopy
        ? resolverOfferCopy
        : resolverOfferMap
      : undefined,
  })

  useEffect(() => {
    function onUnLoad(event: any) {
      dispatchOpenPreCloseCreateService(typeAdd!)
      event.preventDefault()
      event.returnValue = ""

      return `Прерывание`
    }
    window.addEventListener("beforeunload", onUnLoad)

    return () => window.removeEventListener("beforeunload", onUnLoad)
  }, [typeAdd])

  function create(data: IPostOffers, files: File[], deletes: number[]) {
    postOffer(data).then(async (response) => {
      if (!!response.data) {
        if (!!response.data) {
          const id = response.data?.id
          const ids = []

          const responses = await Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: typeAdd!, //offers | discussion | alert
                userId: userId!, // id юзера
                idSupplements: id!, // offers_id
                onUploadProgress: onUploadProgress, // прогресс загрузки
              }),
            ),
          )

          responses.forEach((item) => {
            if (item.data) {
              ids.push(item.data.id)
            }
          })

          if (EModalData.CreateNewOptionModalCopy === stateModal) {
            if (!!offer) {
              const images = offer.images.filter((_) => !deletes.includes(_.id))
              if (images.length > 0) {
                for (const img of images) {
                  ids.push(img.id)
                }
              }
            }
          }

          if (ids.length > 0) {
            await patchOffer(
              {
                images: ids,
              },
              id,
            )
          }

          refetch()
          refetchDataMap()
          setLoading(false)
          dispatchModal(EModalData.SuccessNewOptional)
          dispatchOnboarding("close")
          reset()
        }
      } else {
        setLoading(false)
        handleClose()
      }
    })
  }

  function submit(values: TSchemaCreate) {
    const regexMoreSpace = /\s+/g
    const description = values.description.trim().replaceAll(regexMoreSpace, " ")
    const data: IPostOffers & { userId?: number } = {
      provider: typeAdd!,
      description: description,
      slug: transliterateAndReplace(description).slice(0, 254),
      enabled: true,
      desired: true,
    }
    if (values.userId) {
      data.userId = values.userId
    }

    if (values.help) {
      data.urgent = EnumHelper.HELP_KURSK
    }

    const title = values.title.trim().replace(regexMoreSpace, " ").slice(0, 254)
    data.title = title
    data.slug = transliterateAndReplace(title)

    if (values?.categoryId) {
      data.categoryId = Number(values.categoryId!)
    }
    if (!loading) {
      setLoading(true)

      Promise.resolve(
        initMapAddress && stateModal === EModalData.CreateNewOptionModalMap
          ? postAddress(initMapAddress)
          : values?.addressFeature
          ? createAddress(values?.addressFeature!, userId!)
          : Promise.resolve({ data: { id: offer?.addresses?.[0]?.id! }, error: null }),
      ).then((response) => {
        if (!!response.data) {
          create(
            {
              ...data,
              addresses: [response.data?.id!],
            },
            values.file.file,
            values.deletes,
          )
        } else {
          setError("root", { message: response?.error?.message })
          setLoading(false)
        }
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  function handleClose() {
    closeCreateOffers()
    dispatchModalClose()
  }

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-standard-header-modal">
        <h3 className="text-text-primary text-2xl font-semibold">{headerTitle(typeAdd!, stateModal!)}</h3>
      </header>
      <ul id="ul-create-option-modal" data-test="ul-create-new-option" className="w-full flex flex-col items-center gap-4 px-5">
        <form
          onSubmit={onSubmit}
          data-test={`from-create-new-option-${typeAdd}`}
          data-enum-form={`from-create-new-option-${typeAdd}`}
          className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5 overflow-x-hidden"
        >
          <ControlTitle control={control} typeAdd={typeAdd!} />
          <ComponentDescription control={control} typeAdd={typeAdd!} />
          {typeAdd && [EnumTypeProvider.offer].includes(typeAdd) && <ControlHelp control={control} />}
          {[EnumTypeProvider.offer].includes(typeAdd!) ? <ControllerCategory control={control} setValue={setValue} /> : null}
          <ControlFileAppend control={control} loading={loading} progress={progress} images={offer?.images ?? []} />
          <ControlAddress
            control={control}
            watch={watch("address")}
            trigger={trigger}
            setValue={setValue}
            errors={errors}
            offerCopyAddress={offer?.addresses?.[0]!}
          />
          <Controller name="userId" control={control} render={({ field }) => <AddUser onChange={field.onChange} value={field.value} />} />
          <div data-footer>
            <Button
              type="submit"
              typeButton="fill-primary"
              label={stateModal === EModalData.CreateNewOptionModalCopy ? "Сохранить" : "Создать"}
              disabled={loading}
              loading={loading}
              id="button-create-option-modal-submit"
              data-test="button-create-new-option-submit"
            />
          </div>
        </form>
      </ul>
    </>
  )
}
