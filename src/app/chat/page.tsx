import EmptyState from "./components/EmptyState"
import CreateNewChat from "./components/CreateNewChat"

export default () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-start bg-BG-second rounded-2 max-md:!hidden">
      <CreateNewChat>
        <EmptyState />
      </CreateNewChat>
    </section>
  )
}
