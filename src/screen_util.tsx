import { Dimensions } from "react-native";
import { defaultDesignSize } from "./const";
import type { ScreenUtilDesignSizeDefault, ScreenUtilInitilizeParams } from "./type";
import { OrientationType } from "./type";
import { getCurrentOrientation, getScreenSizeToSafeArea } from "./util";

export let scaleConst: ScreenUtilDesignSizeDefault = {
    safeArea    : true,
    uiWidth       : 0,
    uiHeight      : 0,
    font        : 0,
    scaleHeight: 0,
    scaleWidth  : 0,
    screenSize  : {
        width    : 0,
        height   : 0,
        fontScale: 0,
        scale    : 0
    }
};
export let isScreenUtilInitialize         = false;
export let _orientation = OrientationType.NONE;
export async function initializePromise(): Promise<void> {
    let promiseCheckTimer = -1;
    return new Promise((resolve):void => {
        promiseCheckTimer = setInterval(() => {
            if(!isScreenUtilInitialize) {
                return;
            }
            resolve();
            clearInterval(promiseCheckTimer);
        }, 500);
    })
}
export function _ScreenUtilInitilize(option?: ScreenUtilInitilizeParams): Error | undefined {
    if(!option) {
        option = {
            safeAreaInset  : undefined,
            screenSize     : Dimensions.get("window"),
            splitScreenMode: false,
            width                  : defaultDesignSize.uiWidth,
            height                 : defaultDesignSize.uiHeight,
            minTextSize            : false,
            scaleByHeight  : false,
            debug                  : false,
            safeArea               : true
        };
    }
    const width        = option.width;
    const height       = option.height;
    const dimension    = { ...option.screenSize };
    _orientation = getCurrentOrientation(dimension);
    console.log("dimension", dimension);
    console.log("dimension width, height", width, height);
    const calcDimension = getScreenSizeToSafeArea(dimension, option);

    console.log("calcDimension", dimension, calcDimension);

    scaleConst              = {
        screenSize             : option.screenSize,
        safeArea               : option.safeArea,
        debug                  : option.debug,
        uiWidth                  : width,
        uiHeight                 : height,
        scaleWidth             : calcDimension.width,
        scaleHeight            : calcDimension.height,
        font                   : option.minTextSize ? Math.min(calcDimension.width, calcDimension.height) : calcDimension.width,
        minTextSize            : option.minTextSize,
        scaleByHeight          : option.scaleByHeight,
        splitScreenMode: option.splitScreenMode
    };
    isScreenUtilInitialize = true;
    return undefined;
}