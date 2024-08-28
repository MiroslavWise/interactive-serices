const LoadingFriends = () => (
  <article className="loading-screen w-full px-5 flex flex-col gap-6 items-start pt-6">
    <span className="max-w-52 w-full h-5 rounded-[0.625rem]" />
    {["user-load-a203404", "user-load-d203404", "user-load-f203404", "user-load-l203404"].map((item) => (
      <a
        key={`:key:load:friend:${item}:`}
        className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_calc(10.1875rem_+_2.25rem_+_0.625rem)] gap-3"
      >
        <span className="aspect-square w-full h-full rounded-[0.625rem]" />
        <div className="w-full flex flex-col items-start justify-center gap-1 *:w-full">
          <span className="w-full max-w-[66%] h-5 rounded-[0.625rem]" />
          <span className="w-full max-w-[46%] h-[1.125rem] rounded-[0.5625rem]" />
        </div>
        <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
          <span />
          <span />
        </div>
      </a>
    ))}
  </article>
)

LoadingFriends.displayName = "LoadingFriends"
export default LoadingFriends
