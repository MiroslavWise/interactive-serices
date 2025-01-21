import ItemLinkMenu from "./ItemLinkMenu"

import { LINKS } from "../utils/constants"

function AsideMenu() {
  return (
    <aside className="w-full px-5 py-5 bg-BG-second h-full flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-text-primary">Компания</h2>
      <ul className="mt-2 w-full flex flex-col gap-2">
        {LINKS.map((item) => (
          <ItemLinkMenu key={`:dv:xc:vb:${item.path}:`} path={item.path} label={item.label} />
        ))}
      </ul>
    </aside>
  )
}

AsideMenu.displayName = "AsideMenu"
export default AsideMenu
