export const MASK_CHAR = '_';
export const MASK_REGEX = /[^A-Za-z0-9]/g;

export function stripMask(value: string, mask: string, maskChar: string = MASK_CHAR): string {
    const stripped = [];
    let maskIndex = 0;

    for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
        if (mask[maskIndex] === maskChar) {
            stripped.push(value[i]);
            maskIndex++;
        } else {
            if (value[i] === mask[maskIndex]) {
                maskIndex++;
            } else {
                stripped.push(value[i]);

                continue;
            }
        }
    }

    return stripped.join('');
}

export function applyMask(raw: string, mask: string, maskChar: string = MASK_CHAR): string {
    let masked = '';
    let rawIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        const mChar = mask[i];

        if (mChar === maskChar) {
            if (rawIndex < raw.length) {
                masked += raw[rawIndex];
                rawIndex++;
            } else {
                masked += maskChar;
            }
        } else {
            masked += mChar;
        }
    }

    return masked;
}