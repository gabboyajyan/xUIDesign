import { ReactNode } from 'react';
import { DefaultProps } from '.';
export type EmptyProps = DefaultProps & {
    title?: string;
    description?: string;
    icon?: ReactNode;
};
