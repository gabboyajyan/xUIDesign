import { DefaultProps } from "."

export type TDatePickerProps = DefaultProps & {
    value?: Date,
    onChange?: (date: string) => void,
    disabled?: boolean,
    placeholder?: string,
    error?: boolean,
    feedbackIcons?: boolean
}