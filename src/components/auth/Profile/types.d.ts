import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react";

export interface IDataProfile {}

export interface IStateVisible {
  isService: boolean;
  isProfile: boolean;
  dataProfile: IDataProfile | null;
}