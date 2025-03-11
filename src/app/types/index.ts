import { MouseEvent } from "react";

export type RuleType = string | number | boolean | null | undefined;
export type RuleTypes = RuleType | RuleType[];

export type TargetProps = {
    target: {
        value: RuleType,
        valueAnyType: RuleType | RuleType[]
    }
}

export type MouseEventHandlerSelect = MouseEvent<HTMLDivElement> & TargetProps
