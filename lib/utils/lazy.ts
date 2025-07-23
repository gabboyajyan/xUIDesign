import { RuleType } from '../types';
import { ComponentType, lazy as lazily } from 'react';

export const lazy = <T extends {}, U extends keyof T>(
  loader: (x?: string) => Promise<T>
): T =>
  new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol) => {
      if (typeof componentName === 'string') {
        return lazily(() =>
          loader(componentName).then(x => ({
            default: x[componentName as U] as RuleType as ComponentType<RuleType>
          }))
        );
      }
    }
  });
