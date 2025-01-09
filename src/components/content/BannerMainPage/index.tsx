// "use client"

// import BannerPartner from "../BannerPartner"

// import { useBanner, useMobileSearchCategory, useSearchMobile } from "@/store"

// function BannerMainPage() {
//   const visible = useBanner(({ visible }) => visible)
//   const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
//   const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)

//   if (!visible || visibleSearchCategory || visibleSearchMobile) return null

//   return (
//     <div className="fixed h-[var(--height-banner)] overflow-hidden left-0 right-0 z-[70] md:top-[var(--height-header-nav-bar)] top-[var(--height-mobile-header)]">
//       <BannerPartner />
//     </div>
//   )
// }

// BannerMainPage.displayName = "BannerMainPage"
// export default BannerMainPage
