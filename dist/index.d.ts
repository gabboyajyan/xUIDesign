import * as react from 'react';
import { CSSProperties } from 'react';

type RuleType = any;
interface DefaultProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    noStyle?: boolean;
}
type TargetProps = {
    target: {
        value: RuleType;
    };
};

declare const Checkbox: react.ComponentType<DefaultProps & {
    disabled?: boolean;
    onChange?: (e: react.MouseEvent<HTMLInputElement> & TargetProps) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    value?: boolean;
    tabIndex?: number;
    name?: string;
    children?: react.ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
} & react.RefAttributes<HTMLDivElement>>;

export { Checkbox };
