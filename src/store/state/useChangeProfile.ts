import { create } from "zustand"

import type { IActionIChangeService, IStateChangeService } from "../types/typesChangeService"

export const useChangeService = create<IStateChangeService>((set, get) => ({
    visible: false,
}))

export const dispatchChangeService = (values: IActionIChangeService) =>
    useChangeService.setState((_) => ({
        ...values,
    }))
