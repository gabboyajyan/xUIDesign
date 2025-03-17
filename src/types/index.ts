import { CSSProperties, MouseEvent } from "react";

export type RuleTypes = RuleType | RuleType[];
export type SizeType = "small" | "middle" | "large";
export type RuleType = string | number | boolean | null | undefined;
export type MouseEventHandlerSelect = MouseEvent<HTMLDivElement> & TargetProps
export interface DefaultProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
}

export type TargetProps = {
    target: {
        value: RuleType,
    }
}

export type SyntheticBaseEvent = {
    target: EventTarget & {
        value: RuleType
    },
    currentTarget: EventTarget
}

