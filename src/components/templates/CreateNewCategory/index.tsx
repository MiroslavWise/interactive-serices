"ude client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { postOfferCategory } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchVisibleCreateNewCategory, useCreateNewCategory } from "@/store"
import { LIMIT_TITLE_CREATE_OFFER_CATEGORY, resolverCreateOfferCategory, TCreateOfferCategory } from "./utils/create.schema"

function CreateNewCategory() {
  const [loading, setLoading] = useState(false)
  const visible = useCreateNewCategory(({ visible }) => visible)
  const { onBarters } = useToast()

  const { control, handleSubmit, trigger } = useForm<TCreateOfferCategory>({
    defaultValues: {
      title: "",
      enabled: true,
    },
    reValidateMode: "onChange",
    resolver: resolverCreateOfferCategory,
  })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)
      const title = values.title.trim()

      const body: TCreateOfferCategory = {
        title: title,
        enabled: true,
        provider: "user",
      }

      postOfferCategory({ body }).then((response) => {
        console.log("---postOfferCategory response---", response)
        setLoading(false)
        onBarters({
          message: "Мы обязательно рассмотрим его и ответим вам в личных сообщениях",
          title: "Спасибо за предложение",
          status: "accepted",
        })
        dispatchVisibleCreateNewCategory(false)
      })
    }
  })

  return (
    <div
      className={cx("wrapper-fixed", "p-0 md:p-5 md:pt-[7.5rem] bg-translucent flex flex-col items-center", visible && "!z-[1101]")}
      data-visible={visible}
    >
      <section data-section-modal className="w-full max-md:h-full rounded-0 md:rounded-[2rem] relative md:max-w-[35rem] bg-BG-second">
        <ButtonClose
          onClick={() => {
            dispatchVisibleCreateNewCategory(false)
          }}
        />
        <header className="rounded-none md:rounded-t-[2rem] w-full justify-start max-md:px-5 pt-5 md:pt-6 pb-4 md:pb-5 h-[var(--height-standard-header-modal)] flex fex-row items-center md:justify-center border-b border-solid border-grey-separator">
          <h3 className="text-start md:text-center text-text-primary text-2xl font-semibold">Новая категория</h3>
        </header>
        <form
          onSubmit={onSubmit}
          className="w-full h-full max-md:h-[calc(100%_-_var(--height-standard-header-modal))] p-5 md:pb-10 md:px-10 flex flex-col gap-[1.875rem]"
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <article className="w-full flex flex-col gap-5">
                <label htmlFor={field.name} className="text-text-primary text-sm font-normal">
                  Напишите нам какую категорию вы бы хотели добавить. Старайтесь называть категорию максимально лаконично, например
                  «Починить авто» или «Покормить крокодила». Мы обязательно рассмотрим ваше предложение
                </label>
                <span className="h-[7.375rem] w-full relative">
                  <textarea
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value.replace(/\s{2,}/g, " "))
                      trigger(field.name)
                    }}
                    placeholder="Ваше предложение"
                    maxLength={75}
                    data-error={!!fieldState.error}
                    className={cx(
                      "rounded-2xl border border-solid border-grey-stroke outline-none resize-none w-full h-full px-3.5 pt-3.5 pb-6",
                      "focus:!border-element-accent-1 hover:!border-element-accent-1",
                      !!fieldState.error && "!border-text-error",
                    )}
                  />
                  <span
                    data-error={!!fieldState.error}
                    className={cx(
                      "absolute bottom-1 right-3.5 text-xs font-normal text-right",
                      !!fieldState.error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    {!!fieldState.error ? fieldState.error.message : null} {field.value.length}/{LIMIT_TITLE_CREATE_OFFER_CATEGORY}
                  </span>
                </span>
              </article>
            )}
          />
          <Button type="submit" typeButton="fill-primary" label="Предложить" loading={loading} />
        </form>
      </section>
    </div>
  )
}

CreateNewCategory.displayName = "CreateNewCategory"
export default CreateNewCategory
