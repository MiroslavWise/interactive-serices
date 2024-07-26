import { IconXClose } from "@/components/icons/IconXClose"
import { cx } from "@/lib/cx"
import { dispatchDownloadApplication, useDownloadApplication } from "@/store"

function DownloadApplication() {
  const visible = useDownloadApplication(({ visible }) => visible)

  return (
    <div
      className={cx(
        "hidden md:flex md:items-center md:justify-center fixed md:inset-0 md:w-full md:h-full bg-translucent",
        visible ? "opacity-100 visible z-[1000]" : " opacity-0 invisible -z-10",
      )}
    >
      <section className="w-full h-fit min-h-28 rounded-[2rem] md:max-w-[38.75rem] bg-element-accent-1">
        <button
          type="button"
          onClick={() => dispatchDownloadApplication(false)}
          className="absolute bg-BG-second top-0 -right-1 translate-x-full w-12 h-12 rounded-full p-3.5 flex items-center justify-center *:w-5 *:h-5 [&>svg>path]:stroke-text-primary"
        >
          <IconXClose />
        </button>
        <article className="w-full h-full overflow-hidden rounded-[2rem]"></article>
      </section>
    </div>
  )
}

DownloadApplication.displayName = "DownloadApplication"
export default DownloadApplication
