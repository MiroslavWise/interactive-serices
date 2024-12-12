"use client"

import { useQueryState } from "nuqs"

function ComponentsOffers() {
  const [state] = useQueryState("type")

  return <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"></ul>
}

ComponentsOffers.displayName = "ComponentsOffers"
export default ComponentsOffers
