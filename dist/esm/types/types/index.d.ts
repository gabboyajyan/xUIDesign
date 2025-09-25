import { CSSProperties, MouseEvent } from 'react';
export type RuleType = any;
export type RuleTypes = RuleType | RuleType[];
export type SizeType = 'small' | 'middle' | 'large';
export type MouseEventHandlerSelect = MouseEvent<HTMLDivElement> & TargetProps;
export interface DefaultProps {
    prefixCls?: string;
    prefixClsV3?: string;
    className?: string;
    style?: CSSProperties;
    noStyle?: boolean;
}
export type TargetProps = {
    target: {
        value: RuleType;
    };
};
export type SyntheticBaseEvent = {
    target: EventTarget & {
        value: RuleType;
    };
    nativeEvent?: Event & {
        data?: string | null;
    };
    currentTarget: EventTarget;
};
