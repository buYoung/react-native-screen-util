import type { ScaledSize } from "react-native";
import { StatusBar } from "react-native";
import { inRange, isValueNumber, reduce, round, values } from "./library/lodash";
import { _orientation, _ScreenUtilInitilize, isScreenUtilInitialize, scaleConst } from './screen_util';
import type { ScreenUtilInitilizeParams } from "./type";
import { OrientationType } from './type';
// import { OrientationType } from "./type";

export function checkIsNullOrNotInitilized(value: number): boolean {
    if(!isScreenUtilInitialize) {
        return false;
    }
    return isValueNumber(value) && inRange(value, 0, 10000);
}

export function checkIsNullOrNotInitilizedGeneric<T>(value: T): boolean {
    if(!isScreenUtilInitialize) {
        return false;
    }
    if(!value) {
        return false;
    }

    const result = reduce<T, boolean[]>(values(value), (prev, next) => {
        if(!prev) {
            prev = [];
        }
        prev.push(checkIsNullOrNotInitilizedGeneric(next));
        return prev;
    }, []);
    return !result.includes(false);
}
export function getScreenSizeToSafeArea(value: ScaledSize, option:ScreenUtilInitilizeParams): ScaledSize {
    const statusBarHeight = StatusBar.currentHeight;
    if(statusBarHeight) {
        console.log("statusBarHeight", statusBarHeight);
        // return value;
        value.height -= statusBarHeight;
    }
    if(option.safeArea) {
        console.log("option.safeAreaInset", scaleConst.safeAreaInset);
    }
    if(option.scaleByHeight) {
        value.width = (value.height * option.width) / option.height;
    }
    if(option.splitScreenMode) {
        value.height = Math.max(value.height, 700);
    }
    value.width /= option.width;
    value.height /= option.height;
    value.width = round(value.width, 3);
    value.height = round(value.height, 3);
    return value;
    // if(safeAreaType === SafeAreaType.POTTRAIT) {
    //     value.height -= statusBarHeight;
    // } else {
    //     value.width -= statusBarHeight;
    // }
}
export function getCurrentOrientation(size: ScaledSize): OrientationType {
    if(!size) {
        return OrientationType.NONE;
    }
    const calcSize = size.width < size.height;
    if(calcSize) {
        return OrientationType.POTTRAIT;
    } else {
        return OrientationType.LANDSCAPE;
    }
}
// export function onDetectChangeOrientationChange(dimensions: { window: ScaledSize; screen: ScaledSize }):void {
//     if(getCurrentOrientation(dimensions.window) === _orientation) {
//         return;
//     }
//     _ScreenUtilInitilize(undefined, true);
// }
