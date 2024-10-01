const json = import("../../db/ids.json")

export async function Wait(): Promise<number[]> {
  const response = (await json).default

  return response.ids
}
