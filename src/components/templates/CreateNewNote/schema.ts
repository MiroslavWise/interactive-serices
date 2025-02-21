import { type } from "arktype"
import { arktypeResolver } from "@hookform/resolvers/arktype"

import { MAX_LENGTH_DESCRIPTION_NOTE } from "@/config/constants"

const schema = type({
  description: `0 < string <= ${MAX_LENGTH_DESCRIPTION_NOTE}`,
  is: "boolean",
  file: type({
    file: type.instanceOf(File).array(),
    string: "string[]",
  }),
})

export type TSchema = typeof schema.infer
export const schemaResolver = arktypeResolver(schema)
