import { permanentRedirect, RedirectType } from "next/navigation"
import { URL_APPLE_APP } from "@/config/environment"
export default () => permanentRedirect(URL_APPLE_APP, RedirectType.push)
