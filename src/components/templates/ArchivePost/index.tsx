import { useState } from "react"

import Button from "@/components/common/Button"
import IconArchive from "@/components/icons/IconArchive"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { patchPost } from "@/services/posts"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"
import { dispatchArchivePost, dispatchBallonPostUpdate, useArchivePost } from "@/store"

function ArchivePost() {
  const data = useArchivePost(({ data }) => data)
  const [loading, setLoading] = useState(false)
  const { archive, id } = data ?? {}

  const is = useIsAllowAccess("PATCH", "posts", id)

  async function ok() {
    if (is) {
      if (!loading && !archive) {
        setLoading(true)
        const response = await patchPost(id!, { archive: true })
        if (!!response?.data) {
          dispatchBallonPostUpdate({ archive: true })
        }
        clg("response archive: ", response)
        setLoading(false)
        dispatchArchivePost()
      }
    }
  }

  function no() {
    dispatchArchivePost()
  }

  if (!is) return null

  return (
    <div
      className={cx(
        "fixed w-full h-full inset-0 md:pt-48 md:px-5 bg-translucent",
        !!data ? "flex flex-col items-center max-md:justify-end z-[1020]" : "hidden -z-10",
      )}
    >
      <section className="w-full md:max-w-[33.75rem] flex flex-col gap-[1.875rem] items-center rounded-t-3xl md:rounded-2 bg-BG-second p-5 md:p-10 pt-9 md:pt-5 relative">
        <button
          className="absolute top-0 translate-x-full -right-4 h-12 w-12 rounded-full md:bg-BG-second p-3.5 [&>svg>path]:stroke-text-primary"
          onClick={no}
        >
          <IconSprite id="x-close-20-20" />
        </button>
        <article className="flex flex-col items-center gap-5">
          <div className="relative h-11 w-11 bg-grey-field rounded-full *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-element-accent-1">
            <IconArchive />
          </div>
          <h2 className="text-text-primary text-2xl font-semibold text-center">Вы хотите перенести пост в архив?</h2>
          <p className="-mt-1 text-text-primary text-sm font-normal text-center">
            Пост будет перенесён в архив. Вы не сможете добавлять новые записи, а пользователи не смогут оставлять комментарии.
          </p>
        </article>
        <footer className="w-full flex flex-col-reverse md:flex-row items-center gap-3">
          <Button type="button" typeButton="regular-primary" label="Отменить" onClick={no} loading={loading} disabled={loading} />
          <Button type="button" typeButton="fill-primary" label="Да, перенести" onClick={ok} loading={loading} disabled={loading} />
        </footer>
      </section>
    </div>
  )
}

ArchivePost.displayName = "ArchivePost"
export default ArchivePost
