import { RuleType } from '../types';

export const parseValue = (value: RuleType): RuleType => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  return value;
};

export function createArray(length: number): number[] {
  return Array.from({ length }, (_, index) => index);
}

export function clsx(...args: RuleType[]): string {
  return args
    .flatMap(arg => {
      if (!arg) {
        return [];
      }

      if (typeof arg === 'string') {
        return [arg];
      }

      if (typeof arg === 'number') {
        return [String(arg)];
      }

      if (Array.isArray(arg)) {
        return clsx(...arg).split(' ');
      }

      if (typeof arg === 'object') {
        return Object.entries(arg)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }

      return [];
    })
    .filter(Boolean)
    .join(' ');
}

export function getElementParentDetails(
  el: HTMLElement | null,
  includeSelf = false
): {
  relativePosition: { left: number; top: number };
  scrollableParents: HTMLElement | null;
} {
  if (!el) {
    return {
      relativePosition: { left: 0, top: 0 },
      scrollableParents: null,
    };
  }

  let current: HTMLElement | null = includeSelf ? el : el.parentElement;
  const relativePosition = { left: 0, top: 0 };

  function hasActualScroll(element: HTMLElement): boolean {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  while (current) {
    const style = getComputedStyle(current);

    const allowScroll =
      style.overflowY !== "visible" || style.overflowX !== "visible";

    if (current.style.position === "relative") {
      relativePosition.left += current.offsetLeft;
      relativePosition.top += current.offsetTop;
    }

    if (allowScroll && hasActualScroll(current)) {
      return {
        relativePosition,
        scrollableParents: current,
      };
    }

    current = current.parentElement;
  }

  return {
    relativePosition,
    scrollableParents: document.scrollingElement as HTMLElement,
  };
}
