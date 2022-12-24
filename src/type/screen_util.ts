


export interface ScreenUtilDesignSizeDefault extends ScreenUtilOption {
    width: number;
    height: number;
    font: number;
}
export interface ScreenUtilDesignSize extends ScreenUtilOption {
    width: number;
    height: number;
}


export interface ScreenUtilOption {
    splitScreenMode?: boolean;
    minTextSize?: boolean;
    scaleByHeight? : boolean,
    detectOrientationChange?: boolean,
    debug?: boolean,
    safeArea: boolean
}

export interface ScreenUtilInitilizeParams extends ScreenUtilOption, ScreenUtilDesignSize {

}


export const enum SafeAreaType {
    POTTRAIT,
    LANDSCAPE
}