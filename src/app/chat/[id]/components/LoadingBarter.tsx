export default () => (
  <div className="loading-screen w-full flex flex-col gap-3 items-center mt-auto">
    <span className="w-full max-w-[5.625rem] h-6 rounded-xl" />
    <article className="w-full md:max-w-[25rem] flex flex-col items-center gap-1.5 rounded-2xl border border-solid border-grey-stroke-light p-3 *:w-full *:h-4 *:rounded-lg">
      <span />
      <span className="max-w-[80%]" />
    </article>
  </div>
)
