import { redirect, RedirectType } from "next/navigation"
import { URL_APPLE_APP } from "@/config/environment"
export default () => redirect(URL_APPLE_APP, RedirectType.push)
