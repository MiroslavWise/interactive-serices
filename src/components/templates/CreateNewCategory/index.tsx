"ude client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { postOfferCategory } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchVisibleCreateNewCategory, useCreateNewCategory } from "@/store"
import { LIMIT_TITLE_CREATE_OFFER_CATEGORY, resolverCreateOfferCategory, TCreateOfferCategory } from "./utils/create.schema"

import styles from "./styles/style.module.scss"

function CreateNewCategory() {
  const [loading, setLoading] = useState(false)
  const visible = useCreateNewCategory(({ visible }) => visible)
  const { onBarters } = useToast()

  const { control, handleSubmit, trigger } = useForm<TCreateOfferCategory>({
    defaultValues: {
      title: "",
      enabled: true,
      tags: true,
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
        tags: true,
        provider: "main",
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
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose
          onClick={() => {
            dispatchVisibleCreateNewCategory(false)
          }}
        />
        <header>
          <h3>Новая категория</h3>
        </header>
        <form onSubmit={onSubmit}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <article>
                <label htmlFor={field.name}>
                  Напишите нам какую категорию вы бы хотели добавить. Старайтесь называть категорию максимально лаконично, например
                  «Починить авто» или «Покормить крокодила». Мы обязательно рассмотрим ваше предложение
                </label>
                <span>
                  <textarea
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value.replace(/\s{2,}/g, " "))
                      trigger(field.name)
                    }}
                    placeholder="Ваше предложение"
                    maxLength={75}
                    data-error={!!fieldState.error}
                  />
                  <sup data-error={!!fieldState.error}>
                    {field.value.length}/{LIMIT_TITLE_CREATE_OFFER_CATEGORY}
                  </sup>
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
