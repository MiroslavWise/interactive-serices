export default () => (
  <section className="w-full h-full flex flex-col gap-2.5">
    <ul className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {[1, 2].map((_) => (
        <article key={`::card::offers::key::${_}::`} className="w-full bg-BG-second rounded-2xl flex flex-col gap-4 p-4">
          <div className="w-full flex flex-col gap-3">
            <span className="h-4 max-w-[7.5rem] w-full rounded-lg bg-grey-field" />
            <span className="h-6 max-w-[10.625rem] w-full rounded-xl bg-grey-field" />
          </div>
          <div className="w-full h-auto aspect-[21.3125/13.75] md:aspect-[18.4375/13.75] rounded-2xl bg-grey-field" />
          <div className="w-full grid items-center grid-cols-[2.25rem_1fr] gap-2.5">
            <span className="bg-grey-field w-9 h-9 rounded-[0.625rem]" />
            <span className="bg-grey-field w-full h-4 rounded-lg" />
          </div>
        </article>
      ))}
    </ul>
  </section>
)
