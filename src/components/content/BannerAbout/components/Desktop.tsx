import { cx } from "@/lib/cx"
import { useBanner, dispatchIntro } from "@/store"

export function BannerAboutDesktop() {
  const visible = useBanner(({ visible }) => visible)

  return (
    <div
      className={cx(
        "fixed left-6 rounded-2 p-6 max-w-[21.375rem] bg-element-accent-1 w-full flex flex-col gap-4 cursor-pointer",
        visible ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_2.75rem)]" : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)]",
      )}
      onClick={() => dispatchIntro(true)}
    >
      <h3 className="text-text-button text-2xl font-semibold">Шейра - кто мы и чем можем быть полезны?</h3>
      <section className="flex flex-row items-center gap-2.5 w-fit">
        <p className="text-text-button text-base font-semibold">Узнать</p>
        <img src="/svg/arrow-right.svg" alt="arrow" width={24} height={24} className="w-6 h-6" />
      </section>
    </div>
  )
}
