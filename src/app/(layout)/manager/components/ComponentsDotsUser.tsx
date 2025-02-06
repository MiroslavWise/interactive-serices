import { SpriteDefault } from "@/components/icons/icon-sprite-default"

interface IProps {}

function ComponentsDotsUser({}: IProps) {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 w-5 h-5 p-0.5 *:w-4 *:h-4 flex items-center justify-center text-element-grey-light hover:text-element-accent-1"
    >
      <SpriteDefault id="dots-horizontal" />
    </button>
  )
}

ComponentsDotsUser.displayName = "ComponentsDotsUser"
export default ComponentsDotsUser
