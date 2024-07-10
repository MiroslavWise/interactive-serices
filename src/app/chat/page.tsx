import CreateNewChat from "./components/CreateNewChat"
import EmptyState from "./components/EmptyState"

export default () => {
  return (
    <section className="w-full full flex flex-col items-center justify-center bg-BG-second rounded-[2rem] max-md:!hidden">
      <CreateNewChat>
        <article className="flex flex-col items-center gap-4">
          <EmptyState />
        </article>
      </CreateNewChat>
    </section>
  )
}
