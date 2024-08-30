"use client"

import { useForm } from "react-hook-form"
import { resolverCreate, TSchemaCreate } from "./utils/schema"

function CreatePost() {
  const { handleSubmit } = useForm<TSchemaCreate>({
    resolver: resolverCreate,
  })

  const onSubmit = handleSubmit((values) => {})

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-[var(--height-standard-header-modal)]">
        <h3 className="text-text-primary text-2xl font-semibold">Новый пост</h3>
      </header>
      <ul data-test="ul-create-new-post" className="w-full flex flex-col items-center gap-4 px-5">
        <form onSubmit={onSubmit}>
          <p className="text-text-primary text-sm text-left font-normal">
            Пост это ваша персональная новостная лента. Формат подходит для мероприятий, регулярных активностей, турниров. В пост можно
            добавлять новые записи: тексты и фото. Другие пользователи смогут комментировать ваш пост.
          </p>
        </form>
      </ul>
    </>
  )
}

CreatePost.displayName = "CreatePost"
export default CreatePost
