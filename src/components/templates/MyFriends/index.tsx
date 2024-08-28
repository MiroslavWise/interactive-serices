import { useQuery } from "@tanstack/react-query"

import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { getFriends } from "@/services"
import { DeclensionAllQuantityFriends } from "@/lib/declension"
import { dispatchMyFriends, useAuth, useMyFriends } from "@/store"
import LoadingFriends from "../Friends/components/LoadingFriends"
import NoFriends from "../Friends/components/NoFriends"

function MyFriends() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { profile } = useAuth(({ user }) => user) ?? {}
  const visible = useMyFriends(({ visible }) => visible)

  const { data, isLoading } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId && visible,
    refetchOnMount: true,
  })

  const items = data?.data || []
  const length = items.length
  const lengthName = DeclensionAllQuantityFriends(length)

  return (
    <div
      className={cx(
        "w-full h-dvh md:h-full fixed inset-0 flex-col items-end bg-translucent",
        visible ? "z-[1000] flex visible opacity-100" : "-z-10 invisible hidden opacity-0",
      )}
    >
      <section className="relative h-full w-full md:max-w-[35rem] md:rounded-l-[2rem] bg-BG-second">
        <button
          type="button"
          aria-label="Закрыть друзья"
          aria-labelledby="Закрыть друзья"
          className={cx(
            "absolute flex items-center justify-center w-12 h-12 rounded-full md:top-6 md:bg-BG-second p-3.5 -left-2.5 -translate-x-full",
            "*:h-5 *:w-5 [&>svg>path]:stroke-text-primary",
          )}
          onClick={dispatchMyFriends}
        >
          <IconXClose />
        </button>
        <header className="w-full flex items-center justify-center h-[var(--height-standard-header-modal)]">
          <h3 className="text-2xl text-center font-semibold text-text-primary">Друзья</h3>
        </header>
        {isLoading ? (
          <LoadingFriends />
        ) : length === 0 ? (
          <NoFriends id={userId!} username={profile?.username!} />
        ) : (
          <section className="max-h-[calc(100%_-_var(--height-standard-header-modal))] overflow-y-auto flex flex-col gap-7 pl-4 pr-4 md:pr-6">
            <p className="text-left text-text-primary text-sm font-medium">{lengthName}</p>
            <ul className="w-full"></ul>
          </section>
        )}
      </section>
    </div>
  )
}

MyFriends.displayName = "MyFriends"
export default MyFriends
