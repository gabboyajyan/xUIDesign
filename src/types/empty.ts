import { ReactNode } from "react";
import { DefaultProps } from ".";

export type EmptyContentProps = DefaultProps & {
    title?: string;
    description?: string;
    icon?: ReactNode;
}