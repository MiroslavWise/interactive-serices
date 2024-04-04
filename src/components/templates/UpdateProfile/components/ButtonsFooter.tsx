import { Button } from "@/components/common"
import { dispatchModalClose } from "@/store"

export const ButtonsFooter = ({ disabled, loading }: { disabled: boolean; loading: boolean }) => (
  <footer>
    <Button type="submit" typeButton="fill-primary" label="Сохранить" disabled={disabled} loading={loading} />
    <Button type="button" typeButton="regular-primary" label="Отменить" onClick={dispatchModalClose} loading={loading} />
  </footer>
)
