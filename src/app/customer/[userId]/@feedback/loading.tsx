export default () => (
  <div className="loading-screen w-full h-full bg-BG-second pt-5 px-5 flex flex-col justify-start rounded-2 overflow-hidden overflow-y-auto gap-5 items-center">
    <span className="w-full max-w-40 h-6 rounded-xl" />
    <span className="w-full h-5 rounded-.625" />
    <section className="w-full flex flex-col gap-4">
      {[1, 2, 3].map((_) => (
        <div key={`::key::load::feedback::${_}::`} className="w-full flex flex-col gap-4">
          <div className="w-full h-1px bg-grey-field" />
          <div className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-[0.45rem]">
            <span className="w-full h-9 rounded-.625" />
            <div className="w-full flex flex-col [&>span]:w-full [&>span]:h-4 [&>span]:rounded-lg gap-1">
              <span className="max-w-[11.1875rem]" />
              <span className="max-w-[6.875rem]" />
            </div>
          </div>
          <span className="w-full rounded-2xl h-[6.875rem]" />
        </div>
      ))}
    </section>
  </div>
)
