import { Button } from "@/components/common"
import { dispatchUpdateProfile } from "@/store"

export const ButtonsFooter = () => {
  function close() {
    dispatchUpdateProfile(false)
  }

  return (
    <footer>
      <Button type="submit" typeButton="fill-primary" label="Сохранить" />
      <Button type="button" typeButton="regular-primary" label="Отменить" onClick={close} />
    </footer>
  )
}
