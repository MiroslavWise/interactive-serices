import { dispatchIntro } from "@/store/hooks"

export function BannerAboutDesktop() {
  return (
    <div
      className="fixed left-6 top-[calc(var(--height-header-nav-bar)_+_1.5rem)] rounded-[2rem] p-6 max-w-[21.375rem] bg-element-accent-1 w-full flex flex-col gap-4 cursor-pointer"
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
