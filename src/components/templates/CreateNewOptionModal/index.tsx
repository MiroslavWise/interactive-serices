"use client"

import { AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type IPostOffers } from "@/services/offers/types"
import { type IPostAddress } from "@/services/addresses/types/serviceAddresses"

import Button from "@/components/common/Button"
import ControlHelp from "./components/ControlHelp"
import { ArticleOnboarding } from "@/components/templates"
import ControlAddress from "./components/ControlAddress"
import ControlFileAppend from "./components/ControlFileAppend"
import ControllerCategory from "./components/ControllerCategory"

import { transliterateAndReplace } from "@/helpers"
import { createAddress } from "@/helpers/address/create"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import {
  useAddCreateModal,
  closeCreateOffers,
  dispatchValidating,
  dispatchModalClose,
  dispatchOnboarding,
  useAuth,
  useOnboarding,
  dispatchModal,
  EModalData,
  useModal,
  useNewServicesBannerMap,
  dispatchOpenPreCloseCreateService,
} from "@/store"
import {
  LIMIT_DESCRIPTION,
  LIMIT_TITLE,
  type TSchemaCreate,
  resolverAlertAndDiscussion,
  resolverAlertAndDiscussionMap,
  resolverOffer,
  resolverOfferMap,
} from "./utils/create.schema"
import { headerTitle, placeholderDescription, titleContent, description, titlePlaceholderContent } from "./constants/titles"
import { getUserIdOffers, patchOffer, postOffer, fileUploadService, getGeocodeSearch, getOffersCategories, postAddress } from "@/services"

export default function CreateNewOptionModal() {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const step = useOnboarding(({ step }) => step)
  const visible = useOnboarding(({ visible }) => visible)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const { refetch: refetchDataMap } = useMapOffers()
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
    select: (data) => data?.data || [],
  })
  const categories = c ?? []
  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useNewServicesBannerMap(({ addressInit }) => addressInit)

  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  function onUploadProgress(value: AxiosProgressEvent, name: FormDataEntryValue | null) {
    setProgress((prev) => ({
      ...prev,
      [String(name)]: value,
    }))
  }

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: typeAdd, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: typeAdd }],
    enabled: false,
  })

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
    defaultValues: {
      description: "",
      categoryId: null,
      address: stateModal === EModalData.CreateNewOptionModalMap ? initMapAddress?.additional! : "",
      title: "",
      typeModal: stateModal!,
      initAddress: initMapAddress!,
      file: {
        file: [],
        string: [],
      },
      help: false,
      type: typeAdd!,
      company: {
        title: "",
        erid: "",
        inn: "",
      },
    },
    resolver: [EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)
      ? stateModal === EModalData.CreateNewOptionModal
        ? resolverAlertAndDiscussion
        : resolverAlertAndDiscussionMap
      : typeAdd === EnumTypeProvider.offer
      ? stateModal === EModalData.CreateNewOptionModal
        ? resolverOffer
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

  function create(data: IPostOffers, files: File[]) {
    postOffer(data).then((response) => {
      if (!!response.data) {
        if (!!response.data) {
          const id = response.data?.id
          Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: typeAdd!, //offers | discussion | alert
                userId: userId!, // id юзера
                idSupplements: id!, // offers_id
                onUploadProgress: onUploadProgress, // прогресс загрузки
              }),
            ),
          ).then((responses) => {
            if (responses?.length) {
              const ids = [...responses?.filter((item) => !!item.data)?.map((item) => item.data?.id!)]
              patchOffer(
                {
                  images: ids,
                },
                id,
              ).then(() => {
                refetch()
                refetchDataMap()
                setLoading(false)
                dispatchModal(EModalData.SuccessNewOptional)
                dispatchOnboarding("close")
                reset()
              })
            } else {
              refetch()
              refetchDataMap()
              setLoading(false)
              dispatchModal(EModalData.SuccessNewOptional)
              dispatchOnboarding("close")
              reset()
            }
          })
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
    const data: IPostOffers = {
      provider: typeAdd!,
      description: description,
      slug: transliterateAndReplace(description).slice(0, 254),
      enabled: true,
      desired: true,
    }

    if (values.help) {
      data.urgent = EnumHelper.HELP_KURSK
    }

    const title = values.title.trim().replaceAll(regexMoreSpace, " ")
    data.title = title
    data.slug = transliterateAndReplace(title).slice(0, 254)

    if (values?.categoryId) {
      data.categoryId = Number(values.categoryId!)
    }
    if (!loading) {
      setLoading(true)

      Promise.resolve(
        initMapAddress && stateModal === EModalData.CreateNewOptionModalMap
          ? createAddressPost(initMapAddress)
          : createAddress(values?.addressFeature!, userId!),
      ).then((response) => {
        if (!!response.data) {
          create(
            {
              ...data,
              addresses: [response.data?.id!],
            },
            values.file.file,
          )
        } else {
          setError("root", { message: response?.error?.message })
          setLoading(false)
        }
      })
    }
  }

  async function createAddressPost(values: IPostAddress) {
    return postAddress(values)
  }

  const onSubmit = handleSubmit(submit)

  function handleClose() {
    if (!visible) {
      closeCreateOffers()
      dispatchModalClose()
    }
  }

  useEffect(() => {
    if (visible) {
      dispatchValidating({
        isCategoryId: !!watch("categoryId") || !!watch("title")?.trim(),
        isTitle: !!watch("description"),
        isFiles: !!watch("file.file").length,
      })
    }
  }, [watch("description"), watch("categoryId"), watch("title"), watch("file.file"), visible])

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-standard-header-modal">
        <h3 className="text-text-primary text-2xl font-semibold">{headerTitle(typeAdd!)}</h3>
      </header>
      <ul id="ul-create-option-modal" data-test="ul-create-new-option" className="w-full flex flex-col items-center gap-4 px-5">
        <form
          onSubmit={onSubmit}
          data-test={`from-create-new-option-${typeAdd}`}
          data-enum-form={`from-create-new-option-${typeAdd}`}
          className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5 overflow-x-hidden"
        >
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset id="fieldset-create-option-modal-offer" data-test="fieldset-create-new-option-title">
                <label htmlFor={field.name}>{titleContent(typeAdd!)}</label>
                <input
                  {...field}
                  onChange={(event) => field.onChange(event.target.value.replace(/\s{2,}/g, " "))}
                  type="text"
                  placeholder={titlePlaceholderContent(typeAdd!)}
                  data-error={!!error}
                  maxLength={typeAdd === EnumTypeProvider.offer ? 52 : LIMIT_TITLE}
                />
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          {/* {visible && step === 2 && <ArticleOnboarding />} */}
          {/* {visible && step === 2.5 && <ArticleOnboarding />} */}
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset id="fieldset-create-option-modal-title" data-test="fieldset-create-new-option-description">
                <label htmlFor={field.name}>{description(typeAdd!)}</label>
                <div data-text-area data-focus={visible && step === 3}>
                  <textarea
                    disabled={visible && step !== 3}
                    {...field}
                    placeholder={placeholderDescription(typeAdd!)}
                    data-error={!!error}
                    maxLength={LIMIT_DESCRIPTION + 2}
                    className="whitespace-pre-wrap"
                  />
                  <span data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}>
                    {field.value?.length || 0}/{LIMIT_DESCRIPTION}
                  </span>
                </div>
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          {typeAdd && [EnumTypeProvider.offer].includes(typeAdd) && <ControlHelp control={control} />}
          {[EnumTypeProvider.offer].includes(typeAdd!) ? (
            <ControllerCategory control={control} visible={visible} disabled={visible && step !== 2.5} setValue={setValue} />
          ) : null}
          {/* {visible && step === 3 && <ArticleOnboarding />} */}
          <ControlFileAppend control={control} visible={visible} step={step} loading={loading} typeAdd={typeAdd!} progress={progress} />
          {/* {visible && [4, 5].includes(step) && <ArticleOnboarding />} */}
          <ControlAddress control={control} watch={watch("address")} trigger={trigger} setValue={setValue} errors={errors} />
          {/* {env!?.server!?.host!?.includes("dev") && (
            <section className="w-full flex flex-col gap-2.5">
              <h2>
                Данные компании <span>(если таковые имеются)</span>
              </h2>
              <Controller
                name="company.title"
                control={control}
                render={({ field }) => (
                  <fieldset>
                    <label className="text-text-primary text-sm font-medium">TITLE</label>
                    <input
                      {...field}
                      className="w-full border border-solid border-grey-stroke focus:border-text-accent bg-BG-second text-sm font-normal"
                    />
                  </fieldset>
                )}
              />
              <Controller
                name="company.erid"
                control={control}
                render={({ field }) => (
                  <fieldset>
                    <label className="text-text-primary text-sm font-medium">ERID</label>
                    <input
                      {...field}
                      className="w-full border border-solid border-grey-stroke focus:border-text-accent bg-BG-second text-sm font-normal"
                    />
                  </fieldset>
                )}
              />
              <Controller
                name="company.inn"
                control={control}
                render={({ field }) => (
                  <fieldset>
                    <label className="text-text-primary text-sm font-medium">INN</label>
                    <input
                      {...field}
                      className="w-full border border-solid border-grey-stroke focus:border-text-accent bg-BG-second text-sm font-normal"
                    />
                  </fieldset>
                )}
              />
            </section>
          )} */}
          <div data-footer>
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Создать"
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
