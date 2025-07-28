import { FC, PropsWithChildren, ReactElement } from 'react';

type Props = {
  condition: boolean;
  wrapper: (children: PropsWithChildren['children']) => ReactElement;
} & PropsWithChildren;

export const ConditionalWrapper: FC<Props> = ({
  condition,
  wrapper,
  children
}) => (condition ? wrapper(children) : children);
