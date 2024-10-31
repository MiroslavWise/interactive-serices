import Link from "next/link"
import QRCode from "react-qr-code"

import { ImageStatic } from "@/components/common"
import BadgesImMobile from "./components/BadgesImMobile"
import { IconXClose } from "@/components/icons/IconXClose"
import IconAppleApps from "@/components/icons/IconAppleApps"

import { cx } from "@/lib/cx"
import { URL_APPLE_APP } from "@/config/environment"
import { dispatchDownloadApplication, useDownloadApplication } from "@/store"

import styles from "./styles.module.scss"

function DownloadApplication() {
  const visible = useDownloadApplication(({ visible }) => visible)

  return (
    <div
      style={{
        paddingTop: "4.375rem",
      }}
      className={cx(
        "hidden md:flex flex-col md:items-center fixed md:inset-0 md:w-full md:h-full bg-translucent",
        visible ? "opacity-100 visible z-[1000]" : " opacity-0 invisible -z-10",
      )}
    >
      <section className="relative w-full h-fit max-h-full min-h-28 rounded-2 md:max-w-[38.75rem] bg-element-accent-1 shadow-box-down">
        <button
          type="button"
          onClick={() => dispatchDownloadApplication(false)}
          className="absolute bg-BG-second top-0 -right-1 translate-x-full w-12 h-12 rounded-full p-3.5 flex items-center justify-center *:w-5 *:h-5 [&>svg>path]:stroke-text-primary"
        >
          <IconXClose />
        </button>
        <article
          style={{
            gap: "3.875rem",
          }}
          className={cx(
            "w-full h-full overflow-hidden rounded-2 flex flex-col relative",
            styles.article,
            "after:transition-all after:duration-200 before:transition-all before:duration-200",
            visible ? "after:scale-100 before:scale-100" : "after:scale-50 before:scale-50",
          )}
        >
          <section
            style={{
              paddingRight: "3.0625rem",
            }}
            className="w-full px-10 pt-6 relative z-10 flex flex-row items-start justify-between"
          >
            <article
              className={cx(
                "w-full flex flex-col gap-5 max-w-80 pt-4 transition-all duration-200",
                visible ? "translate-x-0 opacity-100 scale-100" : "-translate-x-20 opacity-40 scale-150",
              )}
            >
              <h3 className="text-text-button text-4xl font-semibold text-left">Скачайте мобильное приложение</h3>
              <p className="text-text-button text-base font-normal text-left">
                С лёгкостью размещайте свои предложения, где бы вы ни были. Находите экспертов, общайтесь, устраивайте мероприятия
                и сообщайте о чрезвычайных ситуациях.
              </p>
            </article>
            <article
              style={{
                width: "9.31869rem",
                height: "19.1135rem",
                aspectRatio: "9.31869/19.1135",
                borderRadius: "1.76044rem",
              }}
              className={cx(
                "relative z-20 bg-[#ffffff33] border border-solid border-[#ffffff66] transition-all duration-200",
                visible ? "translate-x-0 opacity-100 scale-100" : "translate-x-20 opacity-40 scale-150",
              )}
            >
              <ImageStatic
                src="/png/apps-map.webp"
                alt="map"
                height={134}
                width={292}
                style={{
                  width: "8.36638rem",
                  height: "18.22925rem",
                  borderRadius: "1.467rem",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              />
              <BadgesImMobile />
            </article>
          </section>
          <section
            className="w-full grid grid-cols-2 items-start gap-20 px-10relative z-10"
            style={{
              paddingBottom: "6.875rem",
            }}
          >
            <article
              className={cx(
                "w-full gap-4 grid items-start grid-cols-[1.875rem_minmax(0,1fr)] transition-all duration-200",
                visible ? "translate-x-0 opacity-100 scale-100" : "-translate-x-20 opacity-40 scale-150",
              )}
            >
              <div
                style={{
                  borderRadius: "0.3125rem",
                  width: "1.875rem",
                }}
                className="mt-1 aspect-square h-auto flex items-center justify-center bg-element-white"
              >
                <span className="text-text-accent text-lg font-semibold">1</span>
              </div>
              <section
                className="w-full flex flex-col gap-5"
                style={{
                  maxWidth: "10.875rem",
                }}
              >
                <h3 className="text-text-button text-base text-left">Наведите телефон на QR-код</h3>
                <div className="aspect-square w-[6.25rem] h-auto">
                  <QRCode
                    size={256}
                    style={{ height: "auto", width: "100%", aspectRatio: "1/1" }}
                    value={URL_APPLE_APP}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </section>
            </article>
            <article
              className={cx(
                "w-full gap-4 grid items-start grid-cols-[1.875rem_minmax(0,1fr)] transition-all duration-200",
                visible ? "translate-x-0 opacity-100 scale-100" : "translate-x-20 opacity-40 scale-150",
              )}
            >
              <div
                style={{
                  width: "1.875rem",
                  borderRadius: "0.3125rem",
                }}
                className="mt-1 aspect-square h-auto flex items-center justify-center bg-element-white"
              >
                <span className="text-text-accent text-lg font-semibold">2</span>
              </div>
              <section className="w-full max-w-[10.875rem] flex flex-col gap-5">
                <h3 className="text-text-button text-base text-left">Или скачайте из магазина</h3>
                <div className="w-full flex flex-col gap-4">
                  <Link
                    style={{
                      width: "6.3125rem",
                    }}
                    href={URL_APPLE_APP}
                    className="relative h-[1.875rem] *:w-[6.3125rem] *:h-[1.875rem] cursor-pointer"
                    target="_blank"
                  >
                    <IconAppleApps />
                  </Link>
                </div>
              </section>
            </article>
          </section>
        </article>
      </section>
    </div>
  )
}

DownloadApplication.displayName = "DownloadApplication"
export default DownloadApplication
