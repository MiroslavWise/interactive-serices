import { useQuery } from "@tanstack/react-query"

import { ItemCategory } from "./components/ItemCategory"
import { ItemCategoryAdd } from "./components/ItemCategoryAdd"

import { getUserId } from "@/services"
import { EModalData, useAuth, useModal } from "@/store"

function ActiveServicesFrom() {
  const data = useModal(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data: dataUser, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId && data === EModalData.ActiveServicesFrom,
  })

  // const categories = []

  return (
    <>
      <header
        data-test="header-modal-active-services-from"
        className="w-full h-[4.25rem] md:h-[4.75rem] p-5 md:py-6 px-5 max-md:pb-4 flex items-center justify-center border-b border-solid border-grey-separator"
      >
        <h3 className="text-text-primary text-center text-2xl font-semibold">Желаемые услуги</h3>
      </header>
      <div
        data-content
        data-test="content-modal-active-services-from"
        className=" overflow-x-hidden overflow-y-auto p-5 w-full flex flex-col gap-5 h-[calc(100%_-_4.25rem)] md:h-[calc(100%_-_4.75rem)]"
      >
        <p className="text-text-secondary text-sm font-normal">
          Добавьте услуги, которые вам интересны и вы бы хотели их получить. Вы можете добавить не более 5 услуг.
        </p>
        <ul data-test="ul-modal-active-services-from" className="w-full grid max-md:grid-cols-2 grid-cols-3 gap-[0.6875rem] h-fit">
          {/* {categories?.map((item) => (
            <ItemCategory key={`::key::item::category::${item.id}::`} {...item} refetch={refetch} categories={categories} />
          ))} */}
          <ItemCategoryAdd />
        </ul>
      </div>
    </>
  )
}

ActiveServicesFrom.displayName = "ActiveServicesFrom"
export default ActiveServicesFrom
