import { RuleType } from '../types';
import {
    Children,
    createElement,
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

        const childProps = child.props as ReactElement & {
            children?: ReactElement[]
            dangerouslySetInnerHTML?: {
                __html: string
            }
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const childType: string = child.type;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const childKey: string = child.key;

        if (child.type === Fragment || child.type === Suspense) {
            result.push(...flattenChildren(childProps.children));
        } else {
            if ('dangerouslySetInnerHTML' in childProps) {
                const isWrapper =
                    typeof child.type === 'string' &&
                    ['div', 'span', 'label'].includes(childType);

                if (isWrapper) {
                    const divElement = document.createElement(childType);

                    if (childProps?.dangerouslySetInnerHTML?.__html) {
                        divElement.insertAdjacentHTML("beforeend", childProps?.dangerouslySetInnerHTML?.__html);
                    }

                    const node = convertDomNodeToReact(divElement, childKey);

                    if (node) {
                        result.push(node as ReactElement)
                    }

                    return;
                }
            }

            result.push(child);
        }
    });

    return result;
}

function convertDomNodeToReact(
    node: HTMLElement | ChildNode, 
    key?: string
): ReactElement | string | null {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;

        const tag = el.tagName.toLowerCase();
        const props: Record<string, RuleType> = {};

        for (const attr of el.attributes) {
            props[attr.name === 'class' ? 'className' : attr.name] = attr.value;
        }

        if (key !== undefined) {
            props.key = key;
        }

        const children: (ReactElement | string | null)[] = Array.from(el.childNodes).map(
            (childNode, index) => convertDomNodeToReact(childNode, `${key ?? 'node'}-${index}`)
        );

        return createElement(tag, props, ...children);
    }

    return null;
}