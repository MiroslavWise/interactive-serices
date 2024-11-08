import LoadingFooter from "./LoadingFooter"
import LoadingHeader from "./LoadingHeader"

const LoadingChat = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-BG-second rounded-2 max-md:!hidden relative overflow-hidden">
    <LoadingHeader />
    <LoadingFooter />
  </div>
)

LoadingChat.displayName = "LoadingChat"
export default LoadingChat
