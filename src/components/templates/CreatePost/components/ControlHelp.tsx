import { Control, Controller } from "react-hook-form"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { type TSchemaCreatePost } from "../schema"
import { HELP_TEXT } from "@/helpers/constants/help-text"

interface IProps {
  control: Control<TSchemaCreatePost, any>
}

function ControlHelp({ control }: IProps) {
  const [open, setOpen, ref] = useOutsideClickEvent()

  return (
    <Controller
      name="help"
      control={control}
      render={({ field }) => (
        <fieldset
          className="-mt-2.5 !flex-row !gap-2.5 !items-center justify-start "
          id="fieldset-create-option-modal-help"
          data-test="fieldset-create-new-option-help"
        >
          <button
            type="button"
            className={cx(
              "h-6 w-[2.625rem] rounded-xl cursor-pointer p-1 flex flex-row items-center transition-all",
              field.value ? "bg-text-accent justify-end" : "bg-grey-stroke justify-start",
            )}
            onClick={() => field.onChange(!field.value)}
          >
            <span className="rounded-full h-4 w-4 bg-text-button" />
          </button>
          <span
            className={cx(
              "py-1.5 px-2.5 grid grid-cols-[1rem_minmax(0,1fr)] gap-2 items-center h-8 rounded-2xl",
              field.value ? "[background:var(--more-red-gradient)]" : "!bg-grey-field",
            )}
          >
            <div className="relative w-4 h-4 p-2 *:absolute *:top-1/2 *:left-1/2 *:-translate-y-1/2 *:-translate-x-1/2 *:w-4 *:h-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g>
                  <path
                    d="M2.81947 9.78269L6.32182 6.28034L7.15841 7.11788C7.55285 7.51431 8.07785 7.73272 8.63657 7.73272C9.19529 7.73272 9.72029 7.51431 10.1149 7.11772C10.9264 6.30212 10.9264 4.97513 10.1149 4.15953L8.80319 2.84434L9.45479 2.27131C11.0938 0.834969 13.587 0.999313 15.0233 2.63838C16.4597 4.27744 16.2953 6.77056 14.6563 8.20691L13.7201 9.07216L12.6808 8.03284C12.0761 7.42816 11.0922 7.42816 10.4875 8.03284C10.1991 8.32119 10.0387 8.70319 10.0337 9.11019C9.64326 9.11519 9.25435 9.26597 8.9571 9.56322C8.65969 9.86066 8.50888 10.2498 8.50407 10.6405C8.11338 10.6453 7.72419 10.7961 7.42676 11.0936C6.8221 11.6982 6.82207 12.6822 7.42672 13.2868L8.25913 14.1192L7.55516 14.7698C7.07491 15.1907 6.34438 15.1426 5.92351 14.6623C5.50263 14.182 5.55079 13.4515 6.03107 13.0307C5.55082 13.4515 4.82029 13.4034 4.39944 12.9231C3.97857 12.4428 4.02672 11.7123 4.50701 11.2915L4.50694 11.2914C4.02669 11.7123 3.29616 11.6641 2.87529 11.1838C2.51463 10.7723 2.53551 10.2527 2.81947 9.78269Z"
                    fill={field.value ? "var(--text-button)" : "var(--text-disabled)"}
                    className={field.value ? "fill-text-button" : "fill-text-disabled"}
                  />
                  <path
                    d="M1.15577 2.10109C2.69683 0.560055 5.19533 0.560055 6.73639 2.10109L9.44871 4.82059C9.77261 5.14615 9.87211 5.64727 9.70127 6.07284C9.5154 6.5358 9.03668 6.83224 8.53921 6.79093C8.26489 6.76815 8.00646 6.6449 7.81377 6.4488L6.32058 4.95393L2.37427 8.90018L1.1558 7.68168C-0.385262 6.14065 -0.385262 3.64212 1.15577 2.10109ZM12.4858 10.9L11.1487 9.5629C11.0916 9.50607 11.0463 9.43848 11.0155 9.36403C10.9846 9.28959 10.9689 9.20976 10.9691 9.12918C10.9689 9.0486 10.9846 8.96877 11.0155 8.89433C11.0463 8.81988 11.0916 8.75229 11.1487 8.69546C11.2683 8.5759 11.4254 8.51612 11.5825 8.51612C11.7396 8.51612 11.8966 8.5759 12.0162 8.69549L13.3532 10.0326C13.5915 10.2708 13.5922 10.6577 13.3558 10.8971C13.3519 10.901 13.3479 10.9046 13.3439 10.9084C13.2292 11.0187 13.0791 11.0796 12.9195 11.0796C12.8389 11.0799 12.7591 11.0641 12.6847 11.0333C12.6102 11.0024 12.5427 10.9571 12.4858 10.9ZM10.9554 12.4304L9.61833 11.0933C9.5612 11.0365 9.51591 10.9689 9.48508 10.8944C9.45425 10.82 9.43849 10.7402 9.43871 10.6596C9.43849 10.579 9.45426 10.4992 9.48509 10.4247C9.51592 10.3503 9.56121 10.2827 9.61833 10.2259C9.73421 10.11 9.88821 10.0462 10.0521 10.0462C10.2159 10.0462 10.3699 10.11 10.4858 10.2259L11.8229 11.563C11.88 11.6198 11.9253 11.6874 11.9561 11.7618C11.987 11.8363 12.0027 11.9161 12.0025 11.9967C12.0027 12.0768 11.9871 12.1562 11.9566 12.2302C11.9261 12.3043 11.8813 12.3717 11.8247 12.4284C11.8222 12.4309 11.8196 12.4332 11.817 12.4357C11.5774 12.6692 11.1927 12.6676 10.9554 12.4304ZM9.42508 13.9607L8.08799 12.6237C7.84886 12.3845 7.84883 11.9954 8.08799 11.7562C8.20386 11.6404 8.35786 11.5766 8.52171 11.5766C8.68555 11.5766 8.83958 11.6404 8.95543 11.7562L10.2925 13.0933C10.3497 13.1501 10.3949 13.2177 10.4258 13.2922C10.4566 13.3666 10.4724 13.4464 10.4722 13.527C10.4724 13.6074 10.4567 13.687 10.426 13.7612C10.3953 13.8355 10.3503 13.903 10.2934 13.9597C10.2922 13.961 10.2909 13.9621 10.2896 13.9633C10.0502 14.1997 9.66333 14.199 9.42508 13.9607Z"
                    fill={field.value ? "var(--text-button)" : "var(--text-disabled)"}
                    className={field.value ? "fill-text-button" : "fill-text-disabled"}
                  />
                </g>
              </svg>
            </div>
            <span className={cx("text-sm font-medium", field.value ? "text-text-button" : "text-text-primary")}>Щедрое сердце</span>
          </span>
          <button
            type="button"
            className="w-4 h-4 relative"
            ref={ref}
            onClick={(event) => {
              event.stopPropagation()
              setOpen((_) => !_)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g clipPath="url(#clip0_8188_181359)">
                <path
                  d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z"
                  stroke="var(--text-disabled)"
                  className="stroke-text-disabled"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5.33301V7.99967"
                  stroke="var(--text-disabled)"
                  className="stroke-text-disabled"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10.667H8.00667"
                  stroke="var(--text-disabled)"
                  className="stroke-text-disabled"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <section className="absolute left-1/2 -top-3.5">
              <article
                className={cx(
                  "absolute p-2.5 bg-BG-second rounded-.625 -translate-y-full -translate-x-1/2 shadow-box-down w-[19.625rem]",
                  open ? "opacity-100 visible" : "opacity-0 invisible",
                )}
              >
                <p className="text-text-primary text-[0.8125rem] font-normal text-left">{HELP_TEXT}</p>
              </article>
            </section>
          </button>
        </fieldset>
      )}
    />
  )
}

ControlHelp.displayName = "ControlHelp"
export default ControlHelp
