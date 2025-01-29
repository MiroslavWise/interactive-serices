export default () => (
  <div className="loading-screen w-full bg-BG-second mb-auto md:px-5 md:py-3 flex flex-col md:grid md:justify-between md:grid-cols-[minmax(0,1fr)_9.375rem] gap-2.5 border-b border-solid border-grey-stroke-light">
    <article className="w-full flex flex-col items-start justify-center md:max-w-[22.0625rem] gap-2.5 *:w-full *:h-4 *:rounded-lg">
      <span className="max-w-[33%]" />
      <span />
      <span />
    </article>
    <article className="w-full flex flex-row md:flex-col gap-2.5 *:w-full *:h-9 *:rounded-[1.125rem]">
      <span />
      <span />
    </article>
  </div>
)
