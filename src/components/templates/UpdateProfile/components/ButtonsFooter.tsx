import { Button } from "@/components/common"
import { dispatchModalClose } from "@/store"

export const ButtonsFooter = ({ loading }: { loading: boolean }) => (
  <footer data-test="footer-modal-update-profile">
    <Button type="submit" typeButton="fill-primary" label="Сохранить" loading={loading} data-test="modal-update-profile-button-submit" />
    <Button
      type="button"
      typeButton="regular-primary"
      label="Отменить"
      onClick={dispatchModalClose}
      loading={loading}
      data-test="modal-update-profile-button-cancel"
    />
  </footer>
)
