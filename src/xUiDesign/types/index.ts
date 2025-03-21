import { CSSProperties, MouseEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RuleType = any;
export type RuleTypes = RuleType | RuleType[];
export type SizeType = 'small' | 'middle' | 'large';
export type MouseEventHandlerSelect = MouseEvent<HTMLDivElement> & TargetProps;
export interface DefaultProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
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
  nativeEvent?: Event & { data?: string | null };
  currentTarget: EventTarget;
};
