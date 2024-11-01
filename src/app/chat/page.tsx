import dynamic from "next/dynamic"

const EmptyState = dynamic(() => import("./components/EmptyState"))
const CreateNewChat = dynamic(() => import("./components/CreateNewChat"))

export default () => {
  return (
    <section className="w-full h-full flex-col items-center justify-start bg-BG-second rounded-2 hidden md:flex">
      <CreateNewChat>
        <EmptyState />
      </CreateNewChat>
    </section>
  )
}
