import { ScreenResponsive } from "src";
import type {
    ResponsiveDimensionParams,
    ResponsiveDimensionParamType,
    screenResponsiveCheckerAction,
    screenResponsiveGetterAction
} from "type";
import { ResponsiveDimensionUnionParamEnum } from "type";

export function dimension<T extends ResponsiveDimensionParams>(value: T): ResponsiveDimensionParamType {
    let result: ResponsiveDimensionParamType = {};
    try {
        const currentState = ScreenResponsive.getState();
        result = DimensionHelper(value, currentState);
    } catch (e) {

    }
    return result;
}
export const wh = dimension;
function DimensionHelper(value: ResponsiveDimensionParams, state: screenResponsiveCheckerAction & screenResponsiveGetterAction): ResponsiveDimensionParamType {
    const result: ResponsiveDimensionParamType = {};
    if(value.union === ResponsiveDimensionUnionParamEnum.Default) {
        if(!value.width) {
            return {};
        } else {
            result.width = state._____getWidth(value.width);
        }
        if(!value.height) {
            return {};
        } else {
            result.height = state._____getHeight(value.height);
        }
    }
    if(value.union === ResponsiveDimensionUnionParamEnum.Word) {
        if(!value.w) {
            return {};
        } else {
            result.width = state._____getWidth(value.w);
        }
        if(!value.h) {
            return {};
        } else {
            result.height = state._____getHeight(value.h);
        }
    }
    return result;
}