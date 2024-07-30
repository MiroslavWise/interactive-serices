import slugify from "slug"

export const transliterateAndReplace = (string: string): string => (!!string ? slugify(string) : "")
