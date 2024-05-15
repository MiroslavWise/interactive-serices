"ude client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchVisibleCreateNewCategory, useCreateNewCategory } from "@/store"

import styles from "./styles.module.scss"
import { useToast } from "@/helpers/hooks/useToast"

function CreateNewCategory() {
  const [loading, setLoading] = useState(false)
  const visible = useCreateNewCategory(({ visible }) => visible)
  const { onBarters } = useToast()

  const { reset, control, watch, handleSubmit } = useForm<IV>({
    defaultValues: {
      description: "",
    },
  })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      const description = values.description.trim()
      setLoading(true)
      onBarters({
        message: "Мы обязательно рассмотрим его и ответим вам в личных сообщениях",
        title: "Спасибо за предложение",
        status: "accepted",
      })
      dispatchVisibleCreateNewCategory(false)
    }
  })

  const disabled = !watch("description").trim()

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
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <article>
                <label htmlFor={field.name}>
                  Напишите нам какую категорию вы бы хотели добавить. Старайтесь называть категорию максимально лаконично, например
                  «Починить авто» или «Покормить крокодила». Мы обязательно рассмотрим ваше предложение
                </label>
                <span>
                  <textarea {...field} placeholder="Ваше предложение" maxLength={70} data-error={!!fieldState.error} />
                  <sup>{field.value.length}/70</sup>
                </span>
              </article>
            )}
          />
          <Button type="submit" typeButton="fill-primary" label="Предложить" disabled={disabled} loading={loading} />
        </form>
      </section>
    </div>
  )
}

CreateNewCategory.displayName = "CreateNewCategory"
export default CreateNewCategory

interface IV {
  title?: string
  description: string
}
