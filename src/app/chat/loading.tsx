import LoadingHeader from "./components/LoadingHeader"
import LoadingFooter from "./components/LoadingFooter"

export default () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-BG-second rounded-[2rem] max-md:!hidden relative">
    <LoadingHeader />
    <LoadingFooter />
  </div>
)
