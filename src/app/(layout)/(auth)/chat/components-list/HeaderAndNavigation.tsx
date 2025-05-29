import SearchInput from "./SearchInput"

function HeaderAndNavigation() {
  return (
    <header className="w-full pt-1 md:pt-5 px-5 flex flex-col gap-4 md:gap-5">
      <SearchInput />
      {/* Убрана навигация чата https://sheira.youtrack.cloud/agiles/154-2/155-47?issue=1-922 */}
      {/* <NavigationSelectChat /> */}
    </header>
  )
}

HeaderAndNavigation.displayName = "HeaderAndNavigation"
export default HeaderAndNavigation
