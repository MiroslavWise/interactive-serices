import { fetchGet } from "../request"

import { type TGetSearch } from "./types"

const url = "/search"

export const getSearch: TGetSearch = ({ query }) => fetchGet({ url, query })
