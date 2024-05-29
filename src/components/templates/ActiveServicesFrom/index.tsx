import { useQuery } from "@tanstack/react-query"

import { ItemCategory } from "./components/ItemCategory"
import { ItemCategoryAdd } from "./components/ItemCategoryAdd"

import { getUserId } from "@/services"
import { EModalData, useAuth_, useModal } from "@/store"

function ActiveServicesFrom() {
  const data = useModal(({ data }) => data)
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}

  const { data: dataUser, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId && data === EModalData.ActiveServicesFrom,
  })

  const categories = dataUser?.res?.categories || []

  return (
    <>
      <header data-test="header-modal-active-services-from">
        <h3>Желаемые услуги</h3>
      </header>
      <div data-content data-test="content-modal-active-services-from">
        <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить. Вы можете добавить не более 5 услуг.</p>
        <ul data-test="ul-modal-active-services-from">
          {categories?.map((item) => (
            <ItemCategory key={`::key::item::category::${item.id}::`} {...item} refetch={refetch} categories={categories} />
          ))}
          <ItemCategoryAdd />
        </ul>
      </div>
    </>
  )
}

ActiveServicesFrom.displayName = "ActiveServicesFrom"
export default ActiveServicesFrom
