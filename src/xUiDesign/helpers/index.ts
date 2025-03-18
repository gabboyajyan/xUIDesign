import { RuleType } from '@/xUiDesign/types';

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
