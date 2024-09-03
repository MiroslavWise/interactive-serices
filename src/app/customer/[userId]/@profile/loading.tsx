export default () => (
  <div className="loading-screen w-full h-full bg-BG-second p-5 flex flex-col justify-between rounded-[2rem]">
    <section className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex flex-col gap-3 items-center">
        <span className="w-20 h-20 rounded-2xl" />
        <span className="max-w-[7.5rem] w-full h-4 rounded-lg" />
        <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-2.5 *:h-9 *:rounded-[1.125rem] *:w-full">
          <span />
          <span />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <span className="w-full h-[6.25rem] rounded-2xl" />
        <article className="w-full rounded-[0.625rem] p-4 border border-solid border-grey-stroke-light grid grid-cols-[minmax(0,1fr)_3.125rem] gap-2.5 *:h-5 *:w-full *:rounded-xl">
          <span />
          <span />
        </article>
      </div>
    </section>
    <footer className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-2.5 *:h-9 *:rounded-[1.125rem] *:w-full mt-auto">
      <span />
      <span />
    </footer>
  </div>
)
