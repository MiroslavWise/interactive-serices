export default () => (
  <section className="loading-screen flex flex-col gap-6 w-full">
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
  </section>
)
