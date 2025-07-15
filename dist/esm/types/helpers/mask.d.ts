export declare const MASK_CHAR = "_";
export declare const MASK_REGEX: RegExp;
export declare function stripMask(value: string, mask: string, maskChar?: string): string;
export declare function applyMask(raw: string, mask: string, maskChar?: string): string;
