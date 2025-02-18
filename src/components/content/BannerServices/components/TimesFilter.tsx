import { EnumTypeProvider } from "@/types/enum"

import { IconSprite } from "@/components/icons/icon-sprite"
import { IconFilters } from "@/components/icons/IconFilters"
import IconChevronDown from "@/components/icons/IconChevronDown"
import { SpriteHeart } from "@/components/icons/icon-sprite-heart"
import { IconSpriteCategoryId } from "@/components/icons/icon-sprite-category"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { EnumTimesFilter, MAP_TIME, MAP_URGENT, OBJ_TIME } from "../constants"
import {
  dispatchFiltersServiceTime,
  dispatchUrgentFilter,
  useFiltersServices,
  useUrgentFilter,
  dispatchMapCoordinatesZoom,
  dispatchActiveFilterScreen,
} from "@/store"

function TimesFilter() {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const providers = useFiltersServices(({ providers }) => providers)
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  function handleTimeFilter(value: EnumTimesFilter) {
    dispatchFiltersServiceTime(value)
  }

  const current = OBJ_TIME[timesFilter]

  return (
    <div className="w-full flex flex-row items-center gap-1">
      {providers === EnumTypeProvider.offer ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            dispatchActiveFilterScreen(true)
          }}
          data-test="button-search-and-filters-on-close"
          className="w-8 h-8 rounded-full border border-solid bg-BG-second border-grey-stroke flex items-center justify-center *:w-4 *:h-4"
        >
          <IconFilters />
        </button>
      ) : null}
      <button
        type="button"
        ref={ref}
        className={cx(
          "relative rounded-lg grid grid-cols-[minmax(0,1fr)_1rem] gap-1 p-2",
          timesFilter !== EnumTimesFilter.ALL ? "bg-element-accent-1" : "bg-grey-field",
        )}
        data-test={`times-a-banner-services-${timesFilter}`}
        onClick={(event) => {
          event.stopPropagation()
          setOpen((_) => !_)
        }}
      >
        <span
          className={cx(
            "text-[0.8125rem] leading-4 font-normal",
            timesFilter !== EnumTimesFilter.ALL ? "text-text-button" : "text-text-primary",
          )}
        >
          {current}
        </span>
        <div
          className={cx(
            "w-4 h-4 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 *:transition-all *:duration-200",
            open ? "*:rotate-180" : "*:rotate-0",
            timesFilter !== EnumTimesFilter.ALL ? "[&>svg>path]:fill-text-button" : "[&>svg>path]:fill-text-secondary",
          )}
        >
          <IconChevronDown />
        </div>
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] rounded-xl shadow-box-down p-3 h-min w-min flex flex-col gap-0.5 bg-BG-second",
            open ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10",
          )}
        >
          {MAP_TIME.map(([key, label]) => (
            <a
              key={`:item:time:${key}:`}
              className={cx("w-44 h-10 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5 items-center rounded-md p-1.5 hover:bg-grey-field")}
              onClick={(event) => {
                event.stopPropagation()
                setOpen(false)
                handleTimeFilter(key)
              }}
            >
              <div
                className={cx(
                  "relative cursor-pointer rounded-full w-5 h-5 border-2 border-solid p-2.5",
                  key === timesFilter ? "border-element-accent-1 bg-element-accent-1" : " border-grey-stroke bg-transparent",
                )}
              >
                <span
                  className={cx(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-2.5 h-2.5 rounded-full",
                    key === timesFilter ? "bg-text-button" : "bg-transparent",
                  )}
                />
              </div>
              <span className="text-text-primary text-base font-normal whitespace-nowrap line-clamp-1 text-left">{label}</span>
            </a>
          ))}
        </article>
      </button>
      {providers !== EnumTypeProvider.alert
        ? MAP_URGENT.map(([key, label]) => (
            <a
              key={`:key:urgent:filter:${key}:`}
              className={cx(
                "grid py-2 px-2.5 gap-2 rounded-lg cursor-pointer",
                urgent === key
                  ? "[background:var(--more-red-gradient)] grid-cols-[1rem_minmax(0,1fr)_1rem]"
                  : "bg-BG-filter-red grid-cols-[1rem_minmax(0,1fr)]",
              )}
              onClick={() => {
                dispatchUrgentFilter(key)
                if (urgent !== key) {
                  dispatchMapCoordinatesZoom(5)
                }
              }}
            >
              <div className="relative w-4 h-4 *:w-4 *:h-4">
                {urgent === key ? <IconSpriteCategoryId id="category-heart-white" /> : <SpriteHeart />}
              </div>
              <span className={cx("text-[0.8125rem] leading-4 font-normal", urgent === key ? "text-text-button" : "text-text-primary")}>
                {label}
              </span>
              <div
                className={cx(
                  "relative pointer-events-none w-4 h-4 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 [&>svg>path]:stroke-text-button",
                  urgent !== key && "!hidden",
                )}
              >
                <IconSprite id="x-close-20-20" />
              </div>
            </a>
          ))
        : null}
    </div>
  )
}

TimesFilter.displayName = "TimesFilter"
export default TimesFilter
