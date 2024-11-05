import IconArrowLeft from "@/components/icons/IconArrowLeft"

export default () => (
  <header className="loading-screen fixed md:absolute top-0 left-0 right-0 w-full p-1.5 md:py-[0.9375rem] md:px-5 grid grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-1 md:gap-4 bg-BG-second border-b border-solid border-grey-stroke md:h-[4.25rem] h-[3.25]">
    <a className="w-10 md:w-5 h-10 md:h-5 p-5 md:p-2.5 relative cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
      <IconArrowLeft />
    </a>
    <article className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2.5 items-center">
      <span className="w-9 h-9 rounded-full" />
      <div className="w-full flex flex-col gap-1 *:h-4 *:rounded-lg">
        <span className="max-w-[15.875rem]" />
        <span className="max-w-[9.375rem]" />
      </div>
    </article>
  </header>
)
