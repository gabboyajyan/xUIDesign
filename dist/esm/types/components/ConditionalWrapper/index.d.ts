import { FC, PropsWithChildren, ReactElement } from 'react';
type Props = {
    condition: boolean;
    wrapper: (children: PropsWithChildren['children']) => ReactElement;
} & PropsWithChildren;
export declare const ConditionalWrapper: FC<Props>;
export {};
