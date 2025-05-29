import ButtonCloseMenuMobile from "./ButtonCloseMenuMobile"
import ButtonShareMenuMobile from "./ButtonShareMenuMobile"
import ButtonComplaintMenuMobile from "./ButtonComplaintMenuMobile"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"

async function ContentMobileMenu({ userId }: { userId: number | string }) {
  const { data } = await getUserId(userId)

  return (
    <section className="relative w-full bg-BG-second rounded-t-3xl flex flex-col pt-9 pb-5">
      <ButtonCloseMenuMobile />
      <article
        className={cx(
          "w-full pt-2.5 px-2 flex flex-col",
          "[&>button]:w-full [&>button]:py-3 [&>button]:px-2 [&>button]:grid [&>button]:grid-cols-[1.25rem_minmax(0,1fr)] [&>button]:gap-3 [&>button]:items-center [&>button]:rounded-md hover:[&>button]:bg-grey-field",
          "[&>button>span]:text-base [&>button>span]:font-normal [&>button>span]:text-left",
          "[&>button>div]:relative [&>button>div]:w-5 [&>button>div]:h-5 [&>button>div]:p-2.5",
          "[&>button>div>svg]:absolute [&>button>div>svg]:top-1/2 [&>button>div>svg]:left-1/2 [&>button>div>svg]:-translate-x-1/2 [&>button>div>svg]:-translate-y-1/2 [&>button>div>svg]:h-5 [&>button>div>svg]:w-5",
        )}
      >
        <ButtonShareMenuMobile user={data!} />
        <ButtonComplaintMenuMobile user={data!} />
      </article>
    </section>
  )
}

export default ContentMobileMenu
