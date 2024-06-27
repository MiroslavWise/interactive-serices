import ListMessages from "./components/ListMessages"
import HeaderAndNavigation from "./components/HeaderAndNavigation"

export default () => {
  return (
    <section className="w-full h-full rounded-[2rem] bg-BG-second flex flex-col md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden">
      <HeaderAndNavigation />
      <ListMessages />
    </section>
  )
}
