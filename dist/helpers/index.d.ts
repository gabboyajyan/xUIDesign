import { RuleType } from '../types';
export declare const parseValue: (value: RuleType) => RuleType;
export declare function createArray(length: number): number[];
export declare function clsx(...args: RuleType[]): string;
export declare function getElementParentDetails(el: HTMLElement | null, includeSelf?: boolean): {
    relativePosition: {
        left: number;
        top: number;
    };
    scrollableParents: HTMLElement | null;
};
