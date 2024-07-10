import CreateNewChat from "./components/CreateNewChat"

export default () => {
  return (
    <section className="w-full full flex flex-col items-center justify-center bg-BG-second rounded-[2rem] max-md:!hidden">
      <CreateNewChat>
        <article className="flex flex-col items-center gap-4">
          <div className="w-[4.375rem] h-[4.375rem] rounded-full flex items-center justify-center p-[1.1875rem] bg-grey-field">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <g clip-path="url(#clip0_5826_230475)">
                <path
                  d="M27.0831 26.0538C30.0698 23.7178 32.0004 20.0591 32.0004 15.9631C32.0004 8.89109 26.2724 3.16309 19.2004 3.16309C12.1284 3.16309 6.40039 8.89109 6.40039 15.9631C6.40039 23.0351 12.1284 28.7631 19.2004 28.7631C20.0858 28.7631 20.9497 28.6777 21.7817 28.5071C22.3364 29.1578 23.0937 29.7977 24.0964 30.2671C26.859 31.5898 29.3977 30.6724 29.835 30.5018C29.419 30.2031 27.3925 28.6458 27.0831 26.0538ZM11.7338 17.5631C10.8484 17.5631 10.1338 16.8485 10.1338 15.9631C10.1338 15.0777 10.8484 14.3631 11.7338 14.3631C12.6192 14.3631 13.3338 15.0777 13.3338 15.9631C13.3338 16.8485 12.6192 17.5631 11.7338 17.5631ZM19.2005 17.5631C18.3151 17.5631 17.6005 16.8485 17.6005 15.9631C17.6005 15.0777 18.3151 14.3631 19.2005 14.3631C20.0859 14.3631 20.8005 15.0777 20.8005 15.9631C20.8005 16.8485 20.0859 17.5631 19.2005 17.5631ZM26.6672 17.5631C25.7818 17.5631 25.0672 16.8485 25.0672 15.9631C25.0672 15.0777 25.7818 14.3631 26.6672 14.3631C27.5526 14.3631 28.2672 15.0777 28.2672 15.9631C28.2672 16.8485 27.5526 17.5631 26.6672 17.5631Z"
                  fill="#7471F8"
                />
                <path
                  d="M9.7813 26.8324C9.2907 27.3231 8.672 27.7817 7.904 28.1337C5.1414 29.4564 2.6027 28.539 2.1654 28.3684C2.5814 28.0697 4.608 26.5124 4.9174 23.9204C1.9307 21.5844 0 17.9258 0 13.8297C0 6.75766 5.728 1.02966 12.8 1.02966C14.272 1.02966 15.68 1.27496 16.992 1.73366C10.1013 2.80036 4.8 8.77366 4.8 15.9631C4.8 20.3044 6.7307 24.1977 9.7813 26.8324Z"
                  fill="#7471F8"
                />
              </g>
              <defs>
                <clipPath id="clip0_5826_230475">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-text-primary text-center text-lg font-semibold whitespace-nowrap">Сообщения</h2>
            <p className="text-text-primary text-sm text-center font-normal whitespace-nowrap">Выберите, кому хотели бы написать</p>
          </div>
        </article>
      </CreateNewChat>
    </section>
  )
}
