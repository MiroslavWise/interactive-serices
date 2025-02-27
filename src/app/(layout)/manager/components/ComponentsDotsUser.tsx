import { IconSprite } from "@/components/icons/icon-sprite"

interface IProps {}

function ComponentsDotsUser({}: IProps) {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 w-5 h-5 p-0.5 flex items-center justify-center text-element-grey-light hover:text-element-accent-1"
    >
      <IconSprite id="dots-horizontal" className="w-4 h-4" />
    </button>
  )
}

ComponentsDotsUser.displayName = "ComponentsDotsUser"
export default ComponentsDotsUser
