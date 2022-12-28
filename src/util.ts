import type { ScaledSize } from "react-native";
import { Platform, StatusBar } from "react-native";
import { inRange, isValueNumber, reduce, round, values } from "./library/lodash";
import { isScreenUtilInitialize, scaleConst } from "./screen_util";
import type { ScreenUtilInitilizeParams } from "./type";
import { OrientationType } from "./type";
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
    console.log("계산전 ", value);
    calcSafeInset(value, option);
    console.log("계산후 ", value);

    value.width /= option.width;
    value.height /= option.height;
    value.width = round(value.width, 3);
    value.height = round(value.height, 3);
    return value;
}

function calcSafeInset(value: ScaledSize, option:ScreenUtilInitilizeParams): void {
    if(!option.safeArea) {
        return;
    }
    if(!scaleConst.safeAreaInset) {
        return;
    }
    const statusBarHeight = StatusBar.currentHeight;
    const safeAreaType = getCurrentOrientation(value);
    if(safeAreaType === OrientationType.POTTRAIT) {
        if(scaleConst.safeAreaInset.top === 0 && scaleConst.safeAreaInset.bottom === 0) {
            return;
        }
        let TopInset = Platform.select({
            android: scaleConst.safeAreaInset.top,
            ios    : 0
        });
        if(!TopInset) {
            TopInset = 0;
        }
        value.height += (TopInset + scaleConst.safeAreaInset.bottom);
        return;
    }
    if(safeAreaType === OrientationType.LANDSCAPE) {
        if(scaleConst.safeAreaInset.left === 0 && scaleConst.safeAreaInset.right === 0) {
            return;
        }
        value.width += (scaleConst.safeAreaInset.left + scaleConst.safeAreaInset.right);
        return;
    }
    if(!statusBarHeight) {
        return;
    }
    value.height += statusBarHeight;
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
