import type { ScaledSize } from 'react-native';
import { StatusBar } from 'react-native';
import { inRange, isValueNumber, reduce, values } from './library/lodash';
import { _orientation, isScreenUtilInitialize, ScreenUtilInitilize } from './screen_util';
import { OrientationType, SafeAreaType, ScreenUtilInitilizeParams } from './type';

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
export function getScreenSizeToSafeArea(value: ScaledSize, option:ScreenUtilInitilizeParams, safeAreaType: SafeAreaType): ScaledSize {
    const statusBarHeight = StatusBar.currentHeight;
    if(!statusBarHeight) {
        return value;
    }
    if(!option.safeArea) {
        return value;
    }
    if(option.scaleByHeight) {
        value.width = (value.height * option.width) / option.height
    }

    if(safeAreaType === SafeAreaType.POTTRAIT) {
        value.height -= statusBarHeight;
    } else {
        value.width -= statusBarHeight;
    }
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
export function onDetectChangeOrientationChange(dimensions: { window: ScaledSize; screen: ScaledSize }):void {
    if(getCurrentOrientation(dimensions.window) === _orientation) {
        return;
    }
    ScreenUtilInitilize();
}
