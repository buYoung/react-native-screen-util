import { ResponsiveStore } from "../";

import type { ResponsiveDimensionParams, ResponsiveDimensionParamType } from "../../type";
import { ResponsiveDimensionUnionParamEnum } from "../../type";

export function dimension<T extends ResponsiveDimensionParams>(value: T): ResponsiveDimensionParamType {
    let result: ResponsiveDimensionParamType = {};
    try {
        result = DimensionHelper(value);
    } catch (e) {}
    return result;
}
export const wh = dimension;
function DimensionHelper(value: ResponsiveDimensionParams): ResponsiveDimensionParamType {
    const result: ResponsiveDimensionParamType = {};
    if (value.union === ResponsiveDimensionUnionParamEnum.Default) {
        if (!value.width) {
            return {};
        } else {
            result.width = ResponsiveStore._____getWidth(value.width);
        }
        if (!value.height) {
            return {};
        } else {
            result.height = ResponsiveStore._____getHeight(value.height);
        }
    }
    if (value.union === ResponsiveDimensionUnionParamEnum.Word) {
        if (!value.w) {
            return {};
        } else {
            result.width = ResponsiveStore._____getWidth(value.w);
        }
        if (!value.h) {
            return {};
        } else {
            result.height = ResponsiveStore._____getHeight(value.h);
        }
    }
    return result;
}
