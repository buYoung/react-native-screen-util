import { ScreenResponsiveStore } from "src";
import {
    ResponsiveFontParamEnum
} from "../../type";
import type {
    ResponsiveFontSizeType,
    screenResponsiveCheckerAction,
    screenResponsiveGetterAction,
    ResponsiveFontSizeFontUnion
} from "../../type";

export function fontSize<T extends ResponsiveFontSizeFontUnion>(value: T): ResponsiveFontSizeType {
    const result: ResponsiveFontSizeType = {};
    try {
        const currentState = ScreenResponsiveStore.getState();
        result.fontSize = fontSizeHelper(value, currentState);
    } catch (e) {

    }
    return result;
}
export const sp = fontSize;

function fontSizeHelper(value: ResponsiveFontSizeFontUnion, state: screenResponsiveCheckerAction & screenResponsiveGetterAction): number {
    switch (value.union) {
        case ResponsiveFontParamEnum.default:
            if(!value.fontSize) {
                return 0;
            }
            return state._____getFont(value.fontSize);
        case ResponsiveFontParamEnum.word:
            if(!value.sp) {
                return 0;
            }
            return state._____getFont(value.sp);
        default:
            return 0;
    }
}