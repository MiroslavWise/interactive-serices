const EmptyArticle = () => (
  <article className="w-full h-full px-5 flex flex-col items-center">
    <div className="mt-20 flex flex-col items-center gap-2.5">
      <h2 className="text-center text-xl font-semibold text-text-primary">Ничего не найдено</h2>
      <p className="text-center text-sm font-normal text-text-primary">Попробуйте изменить запрос или опишите его другими словами</p>
    </div>
  </article>
)

EmptyArticle.displayName = "EmptyArticle"
export default EmptyArticle
