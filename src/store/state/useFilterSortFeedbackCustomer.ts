import { create } from "zustand"

export const useFilterSortFeedbackCustomer = create<IStateFilterSortFeedbackCustomer>(() => ({ sort: "default" }))

export const dispatchFilterSortFeedbackCustomer = (value: TFilterSort) =>
  useFilterSortFeedbackCustomer.setState(
    (_) => ({
      sort: value,
    }),
    true,
  )

export type TFilterSort = "default" | "first-positive" | "first-negative"

interface IStateFilterSortFeedbackCustomer {
  sort: TFilterSort
}
