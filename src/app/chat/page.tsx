import EmptyState from "./components/EmptyState"
import CreateNewChat from "./components/CreateNewChat"

export default () => {
  return (
    <section className="w-full full flex flex-col items-center justify-center bg-BG-second rounded-[2rem] max-md:!hidden">
      <CreateNewChat>
        <EmptyState />
      </CreateNewChat>
    </section>
  )
}
