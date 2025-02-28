function AllowAccess() {
  return (
    <section className="w-full flex flex-col items-center justify-center p-5">
      <article className="w-full flex flex-col gap-3 max-w-[23.375rem]">
        <h3 className="text-text-primary text-center text-2xl font-medium">Доступ ограничен</h3>
        <p className="text-text-secondary text-center text-base font-normal">
          К сожалению, у вашей учетной записи нет прав для просмотра этой страницы. Если вы считаете, что это ошибка, пожалуйста, обратитесь
          к администратору системы или авторизуйтесь под другим аккаунтом.
        </p>
      </article>
    </section>
  )
}

AllowAccess.displayName = "AllowAccess"
export default AllowAccess
