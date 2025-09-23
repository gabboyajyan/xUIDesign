import { RuleType } from '../types';
import { FormInstance } from '../types/form';
type UseWatchProps = {
    name?: string;
    defaultValue?: RuleType;
    form?: FormInstance;
};
export declare const useWatch: ({ name, defaultValue, form }: UseWatchProps) => any;
export {};
