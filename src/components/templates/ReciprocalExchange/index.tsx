"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"

import type { IReturnData } from "@/services/types/general"
import type { IPostDataBarter } from "@/services/barters/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import type { IPostOffers, IResponseCreate } from "@/services/offers/types"

import { ETypeOfNewCreated, IFormValues } from "./types/types"

import { ItemOffer } from "./components/ItemOffer"
import { ChooseAnOffer } from "./components/Select"
import { ItemProfile } from "./components/ItemProfile"
import { Button, LoadingProfile } from "@/components/common"

import {
  dispatchBallonOffer,
  useReciprocalExchange,
  dispatchReciprocalExchange,
  dispatchReciprocalExchangeCollapse,
  useAuth,
  dispatchRefresh,
} from "@/store"
import { useWebSocket } from "@/context"
import { transliterateAndReplace } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { createAddress } from "@/helpers/address/create"
import { serviceNotifications, postOffer, postBarter, getUserId, getOffersCategories, IResponse } from "@/services"

export default function ReciprocalExchange() {
  const [loading, setLoading] = useState(false)
  const offer = useReciprocalExchange(({ offer }) => offer)
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { socket } = useWebSocket()
  const { on, onBarters } = useToast()
  const methods = useForm<IFormValues>({
    defaultValues: {
      description_new_offer: "",
      description: "",
    },
  })

  const {
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods
  const { data: dataUser, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(offer?.userId!),
    queryKey: ["user", { userId: offer?.userId }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!offer?.userId,
  })
  const { refetch } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: false,
  })

  const { data: res } = dataUser ?? {}
  const { profile } = res ?? {}

  const onSubmit = handleSubmit(submit)

  async function submit(values: IFormValues) {
    if (values.select_new_proposal === ETypeOfNewCreated.new && !values.description_new_offer) {
      setError("description_new_offer", { message: "Введите описание (минимум 5 символов)" })
      return
    }

    if (values.select_new_proposal === ETypeOfNewCreated.interesting && !values.description) {
      setError("description", { message: "Введите описание (минимум 5 символов)" })
      return
    }
    if (!loading) {
      setLoading(true)

      const description = values?.description.trim() || ""
      const description_new_offer = values?.description_new_offer.trim() || ""

      const dataNewEmptyOffer: IPostOffers = {
        categoryId: values.category,
        provider: EnumTypeProvider.offer,
        title: description.toLowerCase().slice(0, 144),
        slug: transliterateAndReplace(description).slice(0, 144),
        description: description,
        enabled: true,
        desired: true,
      }

      const dataNewOffer: IPostOffers = {
        categoryId: values.categoryId!,
        provider: EnumTypeProvider.offer,
        title: description_new_offer.toLowerCase().slice(0, 144),
        slug: transliterateAndReplace(description_new_offer).slice(0, 144),
        description: description_new_offer,
        enabled: true,
        desired: true,
      }

      if (values.select_new_proposal === ETypeOfNewCreated.new && !!values.addressFeature && !!values.check) {
        const response = await createAddress(values.addressFeature, userId!)
        if (!!response.data) {
          dataNewOffer.addresses = [response.data?.id!]
        }
      }

      const socketWith = (idBarter: number, message: string) => {
        socket?.emit("barter", {
          receiverIds: [offer?.userId!],
          message: message || "",
          barterId: idBarter,
          emitterId: userId!,
          status: EnumStatusBarter.INITIATED,
          created: new Date(),
        })
      }

      await Promise.resolve(
        values.select_new_proposal === ETypeOfNewCreated.interesting
          ? postOffer(dataNewEmptyOffer)
          : values.select_new_proposal === ETypeOfNewCreated.new
          ? postOffer(dataNewOffer)
          : Promise.resolve({ data: { id: values?.my_offer! }, error: null }),
      ).then((response: IResponse<IResponseCreate>) => {
        if (!!response?.data) {
          const dataBarter: IPostDataBarter = {
            provider: EnumTypeProvider.barter,
            title: `initial:${response?.data?.id}-consigned:${offer?.id}`,
            initialId: response?.data?.id!,
            consignedId: offer?.id!,
            status: EnumStatusBarter.INITIATED,
            enabled: true,
          }

          postBarter(dataBarter).then((response) => {
            console.log("%c ---OFFERS BARTERS---", "color: green", response)
            if (response?.ok) {
              const message = `Пользователь ${profile?.firstName || ""} ${
                profile?.lastName || ""
              } получил ваше предложение. Мы сообщим вам об ответе.`
              requestAnimationFrame(() => {
                socketWith(response?.res?.id!, !values.my_offer && values.description ? values.description : offer?.title!)
                refetch()
                requestAnimationFrame(() => {
                  onBarters({
                    title: "Предложение на обмен отправлено",
                    message: message,
                    status: EnumStatusBarter.INITIATED,
                  })
                  setLoading(false)
                  dispatchReciprocalExchange({ visible: false, offer: undefined })
                  dispatchBallonOffer({ offer: undefined })
                })
              })
            } else {
              on({
                message: `Обмен с ${profile?.firstName} не может произойти. У нас какая-то ошибка создания. Мы работаем над исправлением`,
              })
              setError("root", { message: response?.error?.message })
              if (response?.error?.message?.toLowerCase() === "invalid access token") {
                dispatchRefresh().then((responseAuth) => {
                  if (response.ok) {
                    onSubmit()
                  } else {
                    dispatchReciprocalExchange({ offer: undefined, visible: false })
                  }
                })
              }
              setLoading(false)
            }
          })
        } else {
          setError("root", { message: response?.error?.message! as string })
          setLoading(false)
        }
      })
    }
  }

  const geo = offer?.addresses?.[0]
  const categoriesWants = categories?.filter((item) => offer?.categories?.includes(item?.id!)) || []

  const disabled =
    !watch("select_new_proposal") ||
    (watch("select_new_proposal") === ETypeOfNewCreated.interesting && (!watch("description")?.trim() || !watch("category"))) ||
    (watch("select_new_proposal") === ETypeOfNewCreated.their && !watch("my_offer")) ||
    ((watch("select_new_proposal") === ETypeOfNewCreated.new && (!watch("description_new_offer")?.trim() || !watch("categoryId"))) ||
    watch("check")
      ? !watch("addressFeature")
      : false)

  return (
    <>
      <header className="w-full h-[4.125rem] md:h-[4.875rem] overflow-hidden py-4 px-14 md:px-3 md:pt-6 md:pb-5 max-md:rounded-none flex flex-row items-center justify-center border-b-[1px] border-solid border-grey-separator">
        <h3 className="max-md:text-xl text-[2rem] text-text-primary font-semibold text-center">Что вы можете предложить?</h3>
      </header>
      <ul className="w-full h-[calc(100%_-_4.125rem)] md:h-[calc(100%_-_4.875rem)] overflow-hidden flex flex-col items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="w-full max-w-[26.25rem] h-full overflow-x-hidden overflow-y-auto flex flex-col items-center gap-10 p-5"
          >
            <section data-profile-offer>
              {isLoadUser ? <LoadingProfile /> : <ItemProfile profile={profile!} geo={geo!} />}
              <ItemOffer />
            </section>
            <ChooseAnOffer loading={loading} firstName={profile?.firstName || " "} categoriesWants={categoriesWants} />
            {!!errors?.root ? <i data-error>{errors?.root?.message}</i> : null}
            <footer className="w-full flex flex-row items-center gap-0.625 mt-auto">
              <Button
                type="submit"
                typeButton="fill-primary"
                label="Предложить обмен"
                loading={loading}
                prefixIcon={<img src="/svg/repeat-white.svg" alt="repeat" height={20} width={20} />}
                disabled={!!disabled}
              />
              <Link
                href={{
                  pathname: "/chat",
                  query: {
                    user: offer?.userId,
                  },
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  // dispatchReciprocalExchangeCollapse(true)
                  dispatchReciprocalExchange({ visible: false })
                }}
              >
                <img src="/svg/message-dots-circle-primary.svg" alt="dots" width={24} height={24} />
              </Link>
            </footer>
          </form>
        </FormProvider>
      </ul>
    </>
  )
}
