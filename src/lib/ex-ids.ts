const json = import("../../db/ids.json")

export async function Wait() {
  const response = (await json).default

  return response.ids
}
