import { Button } from "@/components/common"
import { dispatchUpdateProfile } from "@/store"

export const ButtonsFooter = ({ disabled, loading }: { disabled: boolean; loading: boolean }) => {
  function close() {
    dispatchUpdateProfile(false)
  }

  return (
    <footer>
      <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={disabled} loading={loading} />
      <Button type="button" typeButton="regular-primary" label="Отменить" onClick={close} loading={loading} />
    </footer>
  )
}
