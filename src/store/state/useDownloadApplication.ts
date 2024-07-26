import { create } from "zustand"
export const useDownloadApplication = create<{ visible: boolean }>(() => ({ visible: false }))
export const dispatchDownloadApplication = (value: boolean) => useDownloadApplication.setState(() => ({ visible: value }), true)
