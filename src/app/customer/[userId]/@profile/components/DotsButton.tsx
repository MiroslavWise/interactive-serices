"use client"

import { type IUserResponse } from "@/services/users/types"

function DotsButton({ user }: { user: IUserResponse }) {
  return (
    <button type="button" className="absolute top-0 right-0 w-5 h-5 border-none outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.625 10C5.625 11.0355 4.78553 11.875 3.75 11.875C2.71447 11.875 1.875 11.0355 1.875 10C1.875 8.96447 2.71447 8.125 3.75 8.125C4.78553 8.125 5.625 8.96447 5.625 10ZM11.875 10C11.875 11.0355 11.0355 11.875 10 11.875C8.96447 11.875 8.125 11.0355 8.125 10C8.125 8.96447 8.96447 8.125 10 8.125C11.0355 8.125 11.875 8.96447 11.875 10ZM16.25 11.875C17.2855 11.875 18.125 11.0355 18.125 10C18.125 8.96447 17.2855 8.125 16.25 8.125C15.2145 8.125 14.375 8.96447 14.375 10C14.375 11.0355 15.2145 11.875 16.25 11.875Z"
          fill="var(--element-grey-light)"
          className="fill-element-grey-light"
        />
      </svg>
    </button>
  )
}

DotsButton.displayName = "DotsButton"
export default DotsButton
