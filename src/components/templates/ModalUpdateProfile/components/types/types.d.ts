import type { FC, Dispatch, SetStateAction } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

interface IValuesProfile{
    firstName: string
    lastName: string
    username: string
    day: string | number
    month: string | number
    year: string | number
    email: string
}

interface IHeader{
    selectedImage: string | null
    setSelectedImage: Dispatch<SetStateAction<string | null>>
    setFile: Dispatch<SetStateAction<File | null>>
}

interface IContent{
    errors: FieldErrors<IValuesProfile>
    register: UseFormRegister<IValuesProfile>
    watch: UseFormWatch<IValuesProfile>
    setValue: UseFormSetValue<IValuesProfile>
}

interface IFooter{
    loading: boolean
}

export type THeader = FC<IHeader>
export type TContent = FC<IContent>
export type TFooter = FC<IFooter>