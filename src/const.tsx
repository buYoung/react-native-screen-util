import type { ScreenUtilDesignSizeDefault } from "./type";
import type { SafeAreaInsetType } from "./type/safeArea";

export const defaultDesignSize: ScreenUtilDesignSizeDefault = {
    scaleHeight            : 0,
    scaleWidth             : 0,
    windowHeight           : 0,
    windowWidth            : 0,
    debug                  : false,
    detectOrientationChange: false,
    minTextSize            : false,
    safeArea               : false,
    scaleByHeight          : false,
    splitScreenMode        : false,
    uiWidth                  : 360,
    uiHeight                 : 690,
    font                   : 0
};

export const safeArea: SafeAreaInsetType = {
    top   : 0,
    bottom: 0,
    left  : 0,
    right : 0
};