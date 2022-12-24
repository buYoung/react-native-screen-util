import type { EmitterSubscription } from "react-native";
import { Dimensions, StatusBar } from "react-native";
import { defaultDesignSize } from "./const";
import type { ScreenUtilDesignSizeDefault, ScreenUtilInitilizeParams } from "./type";
import { OrientationType } from "./type";
import { getCurrentOrientation, onDetectChangeOrientationChange } from "./util";

export let _scaleSize: ScreenUtilDesignSizeDefault = {
    safeArea: true,
    width   : 0,
    height  : 0,
    font    : 0
};
export let isScreenUtilInitialize         = false;
export let _orientation = OrientationType.NONE;
let dimensionSubscribe: EmitterSubscription | undefined;

export function ScreenUtilInitilize(option?: ScreenUtilInitilizeParams): Error | undefined {
    if(!option) {
        option = {
            width                  : defaultDesignSize.width,
            height                 : defaultDesignSize.height,
            minTextSize            : false,
            scaleByHeight          : false,
            detectOrientationChange: false,
            debug                  : false,
            safeArea               : true
        };
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
    let screenWidth  = dimension.width;
    let screenHeight = dimension.height;

    const calcWidth    = screenWidth / width;
    const calcHeight   = (option.splitScreenMode ? Math.max(screenHeight, 700) : screenHeight) / height;
    _scaleSize              = {
        debug                  : option.debug,
        width                  : calcWidth,
        height                 : calcHeight,
        font                   : option.minTextSize ? Math.min(calcWidth, calcHeight) : calcWidth,
        minTextSize            : option.minTextSize,
        scaleByHeight          : option.scaleByHeight,
        detectOrientationChange: option.detectOrientationChange,
        splitScreenMode        : option.splitScreenMode
    };
    isScreenUtilInitialize = true;
    return undefined;
}