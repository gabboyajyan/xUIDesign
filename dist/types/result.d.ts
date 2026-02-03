import { CSSProperties, ReactNode } from "react";
export type ResultStatusType = "success" | "error" | "info" | "warning" | "403" | "404" | "500";
export interface ResultProps {
    icon?: ReactNode;
    status?: ResultStatusType;
    title?: ReactNode;
    subTitle?: ReactNode;
    extra?: ReactNode;
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
