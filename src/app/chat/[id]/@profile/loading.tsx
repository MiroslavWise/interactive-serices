export default () => (
  <section className="loading-screen w-full h-full rounded-[2rem] bg-BG-second max-md:hidden p-5 flex flex-col gap-5">
    <article className="w-full flex flex-col items-center gap-3">
      <span className="w-20 h-20 rounded-2xl" />
      <div className="w-full flex flex-col items-center gap-1 *:w-full">
        <span className="max-w-[12.5rem] h-6 rounded-xl" />
        <span className="max-w-[5.625rem] h-2 rounded-[0.25rem]" />
      </div>
    </article>
    <article className="w-full grid grid-cols-3 gap-2">
      {[1234, 341234, 234512].map((item) => (
        <div
          key={`::key::load::${item}::`}
          className="border border-solid border-grey-stroke-light rounded-2xl w-full p-2.5 flex flex-col gap-2 items-start *:w-full"
        >
          <span className="h-2 rounded-[0.25rem]" />
          <span className="max-w-[60%] h-4 rounded-lg" />
        </div>
      ))}
    </article>
    <article className="w-full flex flex-col gap-2 *:w-full *:h-4 *:rounded-lg">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span className="max-w-[60%]" />
    </article>
    <footer className="mt-auto w-full grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] gap-2.5 *:w-full *:h-9 *:rounded-[1.125rem]">
      <span />
      <span />
      <span />
    </footer>
  </section>
)
