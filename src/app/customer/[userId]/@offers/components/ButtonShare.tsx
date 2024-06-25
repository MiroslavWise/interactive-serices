"use client"

import Link from "next/link"
import { useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useOutsideClickEvent } from "@/helpers"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchComplaintModalOffer } from "@/store"

const TITLE_TO_MAP = "Показать на карте"
const TITLE_COMPLAINT = "Пожаловаться"
const TITLE_SHARE = "Поделиться"

function ButtonShare({ offer }: { offer: IResponseOffers }) {
  const [open, setOpen, ref] = useOutsideClickEvent(close)
  const [state, setState] = useState(false)

  function close() {
    setState(false)
  }

  return (
    <article
      className="relative flex items-center justify-center z-20"
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <button
        type="button"
        className="w-4 h-4 relative border-none outline-none [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4 [&>svg]:h-4 z-30"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        <IconDotsHorizontal />
      </button>
      <section
        className={cx(
          "absolute min-w-[12.5rem] invisible opacity-0 top-[calc(100%_+_0.25rem)] right-0 bg-BG-second p-3 flex flex-col gap-0.125 rounded-xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.16)] z-30",
          open && "!opacity-100 !visible",
          "[&>*]:grid [&>*]:grid-cols-[1.25rem_minmax(0,1fr)] [&>*]:gap-0.625 [&>*]:items-center [&>*]:py-2 [&>*]:px-0.375",
          "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
          "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-0.625",
          "[&>*>div>svg]:w-5 [&>*>div>svg]:h-5 [&>*>div>svg]:absolute [&>*>div>svg]:top-1/2 [&>*>div>svg]:left-1/2 [&>*>div>svg]:-translate-x-1/2 [&>*>div>svg]:-translate-y-1/2",
        )}
      >
        {state ? (
          <></>
        ) : (
          <>
            <Link
              href={{ pathname: "/" }}
              title={TITLE_TO_MAP}
              aria-label={TITLE_TO_MAP}
              aria-labelledby={TITLE_TO_MAP}
              onClick={() => {
                if (offer.provider === EnumTypeProvider.offer) {
                  dispatchBallonOffer({ offer })
                }
                if (offer.provider === EnumTypeProvider.discussion) {
                  dispatchBallonDiscussion({ offer })
                }
                if (offer.provider === EnumTypeProvider.alert) {
                  dispatchBallonAlert({ offer })
                }
              }}
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_6650_71646)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.3501 19.4926C15.9999 19.8206 15.5367 20 15.0595 20C14.5824 20 14.1193 19.8207 13.769 19.4927L13.7674 19.4912C13.6299 19.3617 13.4851 19.2278 13.3356 19.0896L13.3307 19.0851C12.5395 18.3539 11.6126 17.4973 10.9756 16.5344C10.1777 15.3284 9.77006 13.8651 10.4995 12.1598C11.2778 10.3401 13.1277 9.19963 15.0595 9.19963C16.9914 9.19963 18.8412 10.3401 19.6196 12.1598C20.3481 13.863 19.9419 15.3276 19.1451 16.5346C18.5015 17.5096 17.5625 18.3742 16.7633 19.1102L16.7584 19.1147L16.7573 19.1157C16.6166 19.2452 16.4802 19.3708 16.3501 19.4926ZM15.0595 10.69C13.6909 10.69 12.4006 11.5047 11.8697 12.7459C11.3871 13.8742 11.6196 14.8068 12.2185 15.712C12.7474 16.5116 13.5179 17.2256 14.3139 17.9633C14.4715 18.1095 14.6302 18.2565 14.7882 18.4053C14.8576 18.47 14.9545 18.5097 15.0595 18.5097C15.1648 18.5097 15.262 18.4698 15.3314 18.4048C15.4794 18.2663 15.6279 18.1292 15.7756 17.9928C16.5828 17.2473 17.3666 16.5236 17.9013 15.7135C18.4998 14.807 18.7314 13.8727 18.2494 12.7459C17.7185 11.5048 16.4282 10.69 15.0595 10.69ZM15.0595 13.1095C14.4904 13.1095 14.0291 13.5708 14.0291 14.1398C14.0291 14.7089 14.4904 15.1702 15.0595 15.1702H15.0677C15.6368 15.1702 16.0981 14.7089 16.0981 14.1398C16.0981 13.5708 15.6368 13.1095 15.0677 13.1095H15.0595Z"
                      fill="var(--text-primary)"
                      className="fill-text-primary"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.14876 16.9703C3.54582 16.7899 4.02301 16.5113 4.58837 16.1812L4.64496 16.1481C5.51287 15.6414 6.03625 15.3411 6.67547 15.4289C6.95717 15.4676 7.2595 15.5809 7.61111 15.7539C7.78526 15.8396 7.95988 15.9339 8.14662 16.0355L8.1807 16.054C8.35273 16.1476 8.53765 16.2481 8.72166 16.3402C9.11695 16.538 9.59775 16.378 9.79556 15.9827C9.99337 15.5874 9.83329 15.1065 9.438 14.9087C9.27931 14.8293 9.11743 14.7413 8.93891 14.6442L8.91121 14.6292C8.72646 14.5287 8.52512 14.4196 8.31791 14.3177C7.96593 14.1444 7.56226 13.9737 7.12035 13.8822L7.12035 1.76914C7.48199 1.90978 7.9227 2.12942 8.57436 2.45553L11.6912 4.01532C11.7845 4.06207 11.8734 4.1066 11.9592 4.14784V7.70009C11.9592 8.14212 12.3176 8.50046 12.7596 8.50046C13.2016 8.50046 13.5599 8.14212 13.5599 7.70009V4.45534L15.5194 4.45533C16.4101 4.45533 16.9952 4.45713 17.4286 4.51707C17.8366 4.57349 17.9894 4.66739 18.0864 4.7672C18.1865 4.87013 18.282 5.03664 18.3382 5.46721C18.3972 5.91862 18.3988 6.5259 18.3988 7.44019V8.16007C18.3988 8.6021 18.7572 8.96044 19.1992 8.96044C19.6412 8.96044 19.9995 8.6021 19.9995 8.16007V7.38585C19.9996 6.53961 19.9996 5.8271 19.9254 5.25975C19.847 4.6597 19.6731 4.10287 19.2342 3.65139C18.7922 3.19675 18.2418 3.01357 17.6479 2.93143C17.0919 2.85454 16.3954 2.85456 15.5759 2.85459L13.6072 2.85459C13.366 2.85459 13.2225 2.85325 13.1258 2.84844C13.0192 2.79346 12.8986 2.76177 12.771 2.75997C12.6823 2.72002 12.5561 2.65812 12.3556 2.55779L9.25743 1.00738C8.6457 0.701242 8.13766 0.446993 7.69739 0.276033C7.2338 0.0960116 6.79138 -0.0143588 6.30527 0.00151053C5.81927 0.017377 5.38478 0.156331 4.93351 0.366091C4.50481 0.565358 4.01359 0.852164 3.42187 1.19764L2.22787 1.89474C1.80069 2.14412 1.43046 2.36026 1.1393 2.57187C0.825861 2.79966 0.554188 3.05626 0.353747 3.41037C0.15398 3.76328 0.0723321 4.12943 0.0349333 4.51734C-2.59044e-05 4.87994 -1.3673e-05 5.31573 5.72596e-07 5.82244L5.97271e-07 13.4604C-1.24886e-05 14.1312 -2.34451e-05 14.6933 0.0431618 15.1348C0.0868043 15.5809 0.184335 16.0487 0.490511 16.431C0.818862 16.841 1.28292 17.1211 1.80144 17.2142C2.29015 17.302 2.74655 17.153 3.14876 16.9703ZM3.97182 14.6869C4.40296 14.4328 4.92133 14.1271 5.51965 13.9534L5.51965 1.85984C5.18381 2.02332 4.77653 2.26032 4.19686 2.59875L3.06729 3.25823C2.59904 3.53161 2.29892 3.70791 2.08033 3.86676C1.87675 4.01472 1.79621 4.11154 1.74675 4.19891C1.69662 4.28747 1.65332 4.41086 1.62824 4.67096C1.60156 4.94773 1.6007 5.30605 1.6007 5.859V13.4183C1.6007 14.1417 1.60162 14.6249 1.63626 14.979C1.67136 15.3378 1.73134 15.4197 1.73992 15.4304C1.83057 15.5436 1.95373 15.6152 2.08443 15.6387C2.08443 15.6387 2.09002 15.6397 2.10189 15.6392C2.11451 15.6387 2.13515 15.6366 2.16615 15.6298C2.22858 15.6161 2.32959 15.5843 2.4866 15.5129C2.80003 15.3705 3.20627 15.1345 3.81889 14.7768C3.86616 14.7492 3.91452 14.7207 3.96401 14.6915L3.96535 14.6908L3.96732 14.6896L3.97182 14.6869Z"
                      fill="var(--text-primary)"
                      className="fill-text-primary"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6650_71646">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span>{TITLE_TO_MAP}</span>
            </Link>
            <a
              title={TITLE_SHARE}
              aria-label={TITLE_SHARE}
              aria-labelledby={TITLE_SHARE}
              onClick={(event) => {
                if (!!window.navigator.share!) {
                  const url = `${env.server.host}/offers/${offer.provider}/${offer.id}`
                  navigator.share({
                    title: offer.title!,
                    text: offer?.addresses[0] ? offer.addresses[0]?.additional! : "",
                    url: url,
                  })
                }
                event.stopPropagation()
              }}
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0057 3.76003C11.0369 3.74714 11.0727 3.75427 11.0965 3.7781L13.3677 6.04929C13.6593 6.34087 14.132 6.34087 14.4236 6.04929C14.7152 5.75771 14.7152 5.28496 14.4236 4.99338L10.7349 1.30462C10.4433 1.01304 9.97054 1.01304 9.67896 1.30462L5.9902 4.99338C5.69862 5.28496 5.69862 5.75771 5.9902 6.04929C6.28178 6.34087 6.75452 6.34087 7.0461 6.04929L9.31874 3.77666C9.34257 3.75282 9.37841 3.74569 9.40955 3.75859C9.44069 3.77149 9.46099 3.80188 9.46099 3.83558L9.46099 12.164C9.46099 12.5763 9.79528 12.9106 10.2076 12.9106C10.62 12.9106 10.9543 12.5763 10.9543 12.164V3.83702C10.9543 3.80332 10.9746 3.77293 11.0057 3.76003ZM3.57531 9.95073C3.57531 9.53837 3.24103 9.20409 2.82867 9.20409C2.41631 9.20409 2.08203 9.53837 2.08203 9.95073V17.3283C2.08203 18.0154 2.35501 18.6745 2.84092 19.1604C3.32683 19.6463 3.98587 19.9193 4.67305 19.9193H15.7393C16.4265 19.9193 17.0855 19.6463 17.5715 19.1604C18.0574 18.6745 18.3303 18.0154 18.3303 17.3283V9.95073C18.3303 9.53837 17.9961 9.20409 17.5837 9.20409C17.1714 9.20409 16.8371 9.53837 16.8371 9.95073V17.3283C16.8371 17.6194 16.7214 17.8986 16.5156 18.1045C16.3097 18.3103 16.0305 18.426 15.7393 18.426H4.67305C4.38191 18.426 4.1027 18.3103 3.89683 18.1045C3.69096 17.8986 3.57531 17.6194 3.57531 17.3283V9.95073Z"
                    fill="var(--text-primary)"
                    className="fill-text-primary"
                  />
                </svg>
              </div>
              <span>{TITLE_SHARE}</span>
            </a>
            <a
              title={TITLE_COMPLAINT}
              aria-label={TITLE_COMPLAINT}
              aria-labelledby={TITLE_COMPLAINT}
              onClick={(event) => {
                console.log("onClick TITLE_COMPLAINT: ")
                event.stopPropagation()
                event.preventDefault()
                dispatchComplaintModalOffer({ offer })
                setState(false)
                setOpen(false)
              }}
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_6650_54087)">
                    <path
                      d="M10.0845 5.59052C10.5405 5.59052 10.9102 5.9602 10.9102 6.41621V10.0859C10.9102 10.542 10.5405 10.9116 10.0845 10.9116C9.62849 10.9116 9.25882 10.542 9.25882 10.0859V6.41621C9.25882 5.9602 9.62849 5.59052 10.0845 5.59052Z"
                      fill="var(--text-error)"
                      className="fill-text-error"
                    />
                    <path
                      d="M10.0845 12.9271C9.62849 12.9271 9.25882 13.2968 9.25882 13.7528C9.25882 14.2088 9.62849 14.5785 10.0845 14.5785H10.0937C10.5497 14.5785 10.9194 14.2088 10.9194 13.7528C10.9194 13.2968 10.5497 12.9271 10.0937 12.9271H10.0845Z"
                      fill="var(--text-error)"
                      className="fill-text-error"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.0859375 10.0859C0.0859375 4.56309 4.56309 0.0859375 10.0859 0.0859375C15.6088 0.0859375 20.0859 4.56309 20.0859 10.0859C20.0859 15.6088 15.6088 20.0859 10.0859 20.0859C4.56309 20.0859 0.0859375 15.6088 0.0859375 10.0859ZM10.0859 1.73731C5.47512 1.73731 1.73731 5.47512 1.73731 10.0859C1.73731 14.6968 5.47512 18.4346 10.0859 18.4346C14.6968 18.4346 18.4346 14.6968 18.4346 10.0859C18.4346 5.47512 14.6968 1.73731 10.0859 1.73731Z"
                      fill="var(--text-error)"
                      className="fill-text-error"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6650_54087">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="!text-text-error">{TITLE_COMPLAINT}</span>
            </a>
          </>
        )}
      </section>
    </article>
  )
}

ButtonShare.displayName = "ButtonShare"
export default ButtonShare
