import { IconCategory } from "@/lib/icon-set"

export function ImageCategory({ id }: { id: number | string }) {
  if (!id) return null

  return (
    <img
      alt={`${id!}::`}
      width={16}
      height={16}
      src={IconCategory(id!)}
      onError={(error: any) => {
        if (error?.target) {
          try {
            error.target.src = `/svg/category/default.svg`
          } catch (e) {
            console.log("catch e: ", e)
          }
        }
      }}
    />
  )
}
