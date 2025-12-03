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

export function getScrollParent(
  el: HTMLElement | null,
  includeSelf = false
): HTMLElement | null {
  if (!el) return null;

  let current: HTMLElement | null = includeSelf ? el : el.parentElement;

  while (current) {
    const style = getComputedStyle(current);

    const canScroll = 
        ['auto', 'scroll'].includes(style.overflowY) || ['auto', 'scroll'].includes(style.overflowX)

    if (canScroll) {
      current.style.position = 'relative';

      return current;
    }

    current = current.parentElement;
  }

  return document.scrollingElement as HTMLElement;
}