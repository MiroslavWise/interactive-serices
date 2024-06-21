export default () => (
  <section className="loading-screen flex flex-col gap-6 w-full h-full">
    <div className="w-full flex flex-row gap-2 p-0.625 rounded-2xl bg-BG-second">
      {[1, 2, 3].map((_) => (
        <article
          key={`::item::load::about::${_}::`}
          className="w-full rounded-[0.625rem] border-[1px] border-solid border-grey-stroke-light py-2 px-4 flex flex-col gap-0.625"
        >
          <span className="bg-grey-field max-w-[7.5rem] w-full h-4 rounded-lg" />
          <span className="bg-grey-field max-w-[3.125rem] w-full h-[1.375rem] rounded-[0.6875rem]" />
        </article>
      ))}
    </div>
    <div className="w-full flex flex-col gap-3 md:gap-4">
      <div className="h-11 w-full rounded-[1.375rem] bg-BG-second flex flex-row gap-0.625 py-2 px-3">
        {[1, 2, 3].map((_) => (
          <span key={`::item::load::segment::${_}::`} className="h-7 rounded-[0.875rem] bg-grey-field w-full" />
        ))}
      </div>
      <div className="w-full h-auto md:grid md:grid-cols-2 max-md:grid-cols-1 gap-3 md:gap-4">
        {[1, 2].map((_) => (
          <article key={`::card::offers::key::${_}::`} className="w-full bg-BG-second rounded-2xl flex flex-col gap-4 p-4">
            <div className="w-full flex flex-col gap-3">
              <span className="h-4 max-w-[7.5rem] w-full rounded-lg bg-grey-field" />
              <span className="h-6 max-w-[10.625rem] w-full rounded-xl bg-grey-field" />
            </div>
            <div className="w-full h-auto aspect-[21.3125/13.75] md:aspect-[18.4375/13.75] rounded-2xl bg-grey-field" />
            <div className="w-full grid items-center grid-cols-[2.25rem_1fr] gap-0.625">
              <span className="bg-grey-field w-9 h-9 rounded-[0.625rem]" />
              <span className="bg-grey-field w-full h-4 rounded-lg" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)
