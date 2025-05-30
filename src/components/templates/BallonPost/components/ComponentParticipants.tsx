import { useQuery } from "@tanstack/react-query"

import Avatar from "@avatar"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { getPostParticipants } from "@/services/posts"
import { dispatchPublicProfile, useAuth } from "@/store"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { declensionAllQuantityParticipants } from "@/lib/declension"
import ComponentDotDeleteUser from "./ComponentDotDeleteUser"

interface IProps {
  postUserId: number
  id: number
  title: string
  isParticipant: boolean
}

function ComponentParticipants({ postUserId, id, title, isParticipant }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const is = !!userId && postUserId === userId && isParticipant
  const { isTablet } = useResize()

  const onShare = useNavigator({
    url: `/post/${id}`,
    title: title! ?? "",
  })

  const { data, refetch } = useQuery({
    queryFn: () => getPostParticipants(id),
    queryKey: ["participants", { id: id }],
    enabled: isParticipant,
    refetchOnMount: true,
  })

  const list = data?.data?.participants ?? []
  const nameCount = declensionAllQuantityParticipants(list.length)

  return is ? (
    <section className={cx("w-full flex flex-col gap-5 h-full", list.length === 0 && "items-center justify-center")}>
      {list.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"></div>
            <span className="text-text-primary text-sm font-medium">{nameCount}</span>
          </div>
          <ul className="w-full flex flex-col gap-2.5 pl-5">
            {list.map((item, index) => (
              <li key={`key:comment:${item.id}:`} className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3 relative">
                <span className="absolute top-1/2 -translate-y-1/2 right-full pr-1 text-xs text-text-accent text-right w-5">
                  {index + 1}
                </span>
                <Avatar className="w-8 h-8 p-4 rounded-full" image={item?.image} userId={item?.id} />
                <article className="w-full flex flex-col gap-0.5">
                  <div className="flex flex-row items-center gap-2">
                    <a
                      {...{
                        className: "text-text-primary text-xs font-normal cursor-pointer",
                        href: isTablet ? `/customer/${item?.id}` : undefined,
                        target: isTablet ? "_blank" : undefined,
                        onClick() {
                          if (!isTablet) {
                            dispatchPublicProfile(item?.id)
                          }
                        },
                      }}
                    >
                      {item?.firstName || "Имя"} {item?.lastName || ""}
                    </a>
                    <div className="relative w-3 h-3 p-1.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3 *:z-20 -ml-1">
                      <IconVerifiedTick />
                    </div>
                  </div>
                </article>
                {userId === postUserId && <ComponentDotDeleteUser idUser={item.id} id={id} refetch={refetch} />}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <section className="flex flex-col gap-2.5 items-center justify-center my-auto">
          <h4 className="text-text-primary text-lg font-semibold text-center">Пока нет участников</h4>
          <p className="text-text-secondary text-center text-sm font-normal">
            <a className="text-text-accent" title="Поделиться" aria-label="Поделиться" aria-labelledby="Поделиться" onClick={onShare}>
              Поделитесь
            </a>{" "}
            своей записью, так вы можете набрать больше участников
          </p>
        </section>
      )}
    </section>
  ) : null
}

ComponentParticipants.displayName = "ComponentParticipants"
export default ComponentParticipants
