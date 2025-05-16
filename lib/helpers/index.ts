import { RuleType } from '@/types';

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
