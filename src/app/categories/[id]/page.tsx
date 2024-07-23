import { getOffersCategoriesPROD } from "@/services"

// export async function generateStaticParams() {
//   const { res } = await getOffersCategoriesPROD()
//   const items = res || []

//   return items.map((_) => ({
//     id: String(_.id),
//   }))
// }

export default async ({ params }: { params: { id: string } }) => {
  const { id } = params ?? {}
  const { res } = await getOffersCategoriesPROD()
  const items = res || []
  const find = items.find((_) => String(_.id) === id)

  return (
    <section className="w-full h-full flex flex-col gap-3 items-center justify-center">
      <h1 className="w-full text-center text-text-primary text-2xl font-semibold mb-5">Название: {find?.title}</h1>
      <p className="w-full text-center text-text-primary text-sm font-normal">Провайдер: {find?.provider}</p>
      <p className="w-full text-center text-text-primary text-sm font-normal">Слаг (ссылка): {find?.slug}</p>
      <p className="w-full text-center text-text-primary text-sm font-normal">Описание: {find?.description}</p>
    </section>
  )
}
