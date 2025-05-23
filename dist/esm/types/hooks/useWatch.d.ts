import { RuleType } from 'lib/types';
import { FormInstance } from 'lib/types/form';
type UseWatchProps = {
    name?: string;
    defaultValue?: RuleType;
    form?: FormInstance;
};
export declare const useWatch: ({ name, defaultValue, form }: UseWatchProps) => any;
export {};
