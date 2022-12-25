import type { EmitterSubscription } from "react-native";
import { Dimensions } from "react-native";
import { defaultDesignSize } from "./const";
import type { ScreenUtilDesignSizeDefault, ScreenUtilInitilizeParams } from "./type";
import { OrientationType } from "./type";
import { getCurrentOrientation, getScreenSizeToSafeArea, onDetectChangeOrientationChange } from "./util";

export let scaleConst: ScreenUtilDesignSizeDefault = {
    safeArea    : true,
    uiWidth       : 0,
    uiHeight      : 0,
    font        : 0,
    windowHeight: 0,
    windowWidth : 0,
    scaleHeight : 0,
    scaleWidth  : 0
};
export let isScreenUtilInitialize         = false;
export let _orientation = OrientationType.NONE;
let dimensionSubscribe: EmitterSubscription | undefined;
export let oldOptions: ScreenUtilInitilizeParams | undefined = undefined;
export function _ScreenUtilInitilize(option?: ScreenUtilInitilizeParams, loadSavedOption?:boolean): Error | undefined {
    if(oldOptions && loadSavedOption) {
        option = oldOptions;
    }
    if(!option) {
        option = {
            width                  : defaultDesignSize.uiWidth,
            height                 : defaultDesignSize.uiHeight,
            minTextSize            : false,
            scaleByHeight          : false,
            detectOrientationChange: false,
            debug                  : false,
            safeArea               : true
        };
    }
    if (oldOptions === undefined) {
        oldOptions = option;
    }
    if(option.detectOrientationChange) {
        if(dimensionSubscribe) {
            dimensionSubscribe.remove();
        }
        dimensionSubscribe = Dimensions.addEventListener("change", onDetectChangeOrientationChange);
    }

    const dimension    = Dimensions.get("window");
    _orientation = getCurrentOrientation(dimension);
    const width        = option.width;
    const height       = option.height;
    const calcDimension = getScreenSizeToSafeArea(dimension, option);


    scaleConst              = {
        windowHeight           : dimension.height,
        windowWidth            : dimension.width,
        safeArea               : option.safeArea,
        debug                  : option.debug,
        uiWidth                  : width,
        uiHeight                 : height,
        scaleWidth             : calcDimension.width,
        scaleHeight            : calcDimension.height,
        font                   : option.minTextSize ? Math.min(calcDimension.width, calcDimension.height) : calcDimension.width,
        minTextSize            : option.minTextSize,
        scaleByHeight          : option.scaleByHeight,
        detectOrientationChange: option.detectOrientationChange,
        splitScreenMode        : option.splitScreenMode
    };
    isScreenUtilInitialize = true;
    return undefined;
}