import {
    Children,
    Fragment,
    isValidElement,
    ReactElement,
    ReactNode,
    Suspense
} from 'react';

export function flattenChildren(children: ReactNode): ReactElement[] {
    const result: ReactElement[] = [];

    Children.forEach(children, child => {
        if (!isValidElement(child)) return;

        if (child.type === Fragment || child.type === Suspense) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            result.push(...flattenChildren(child.props.children));
        } else {
            result.push(child);
        }
    });

    return result;
}