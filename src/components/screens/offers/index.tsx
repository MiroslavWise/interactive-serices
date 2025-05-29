import { HeaderExchangeOffers } from "./components/HeaderExchangeOffers"
import { ContainerOfOngoingAndCompleted } from "./components/ContainerOfOngoingAndCompleted"

const OffersMobile = () => {
  return (
    <>
      <HeaderExchangeOffers />
      <ContainerOfOngoingAndCompleted />
    </>
  )
}
OffersMobile.displayName = "OffersMobile"
export default OffersMobile
