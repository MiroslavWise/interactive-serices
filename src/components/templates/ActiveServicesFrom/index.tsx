import { useQuery } from "@tanstack/react-query"

import { ButtonClose } from "@/components/common"
import { ItemCategory } from "./components/ItemCategory"
import { ItemCategoryAdd } from "./components/ItemCategoryAdd"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { dispatchActiveServicesFrom, useActiveServicesFrom, useAuth } from "@/store"

import styles from "./styles/style.module.scss"

export function ActiveServicesFrom() {
  const userId = useAuth(({ userId }) => userId)
  const visible = useActiveServicesFrom(({ visible }) => visible)

  const { data: dataUser, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId && visible,
  })

  const categories = dataUser?.res?.categories || []

  function close() {
    dispatchActiveServicesFrom(false)
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Желаемые услуги</h3>
        </header>
        <div data-content>
          <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить. Вы можете добавить не более 5 услуг.</p>
          <ul>
            {categories?.map((item) => (
              <ItemCategory key={`::key::item::category::${item.id}::`} {...item} refetch={refetch} categories={categories} />
            ))}
            <ItemCategoryAdd />
          </ul>
        </div>
      </section>
    </div>
  )
}
