import { ResponsiveStore } from "../";

import { ResponsiveFontParamEnum } from "../../type";
import type { ResponsiveFontSizeType, ResponsiveFontSizeFontUnion } from "../../type";

export function fontSize<T extends ResponsiveFontSizeFontUnion>(value: T): ResponsiveFontSizeType {
    const result: ResponsiveFontSizeType = {};
    try {
        result.fontSize = fontSizeHelper(value);
    } catch (e) {}
    return result;
}
export const sp = fontSize;

function fontSizeHelper(value: ResponsiveFontSizeFontUnion): number {
    switch (value.union) {
        case ResponsiveFontParamEnum.default:
            if (!value.fontSize) {
                return 0;
            }
            return ResponsiveStore._____getFont(value.fontSize);
        case ResponsiveFontParamEnum.word:
            if (!value.sp) {
                return 0;
            }
            return ResponsiveStore._____getFont(value.sp);
        default:
            return 0;
    }
}
