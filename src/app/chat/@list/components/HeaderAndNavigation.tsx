import SearchInput from "./SearchInput"
import NavigationSelectChat from "./NavigationSelectChat"

function HeaderAndNavigation() {
  return (
    <header className="w-full pt-5 px-5 flex flex-col gap-5">
      <SearchInput />
      <NavigationSelectChat />
    </header>
  )
}

HeaderAndNavigation.displayName = "HeaderAndNavigation"
export default HeaderAndNavigation
