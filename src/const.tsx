import type { ScreenUtilDesignSizeDefault } from "./type";
import type { SafeAreaInsetType } from "./type/safeArea";

export const defaultDesignSize: ScreenUtilDesignSizeDefault = {
    safeAreaInset : {
        top   : 0,
        bottom: 0,
        left  : 0,
        right : 0
    },
    screenSize   : {
        width    : 0,
        height   : 0,
        scale    : 0,
        fontScale: 0
    },
    scaleHeight            : 0,
    scaleWidth             : 0,
    debug                  : false,
    minTextSize            : true,
    safeArea               : true,
    scaleByHeight          : false,
    splitScreenMode: false,
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