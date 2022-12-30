import type { ScaledSize } from "react-native";
import type { SafeAreaInsetType } from "./safeArea";
import type { equalityFunctionEnum } from "../type/equality_function";


export interface ScreenUtilDesignSizeDefault extends ScreenUtilOption {
    uiWidth: number;
    uiHeight: number;
    scaleWidth: number;
    scaleHeight: number;
    font: number;
}
export interface ScreenUtilDesignSize extends ScreenUtilOption {
    width: number;
    height: number;
}


export interface ScreenUtilOption {
    splitScreenMode?: boolean;
    minTextSize?: boolean;
    scaleByHeight? : boolean;
    debug?: boolean;
    safeArea?: boolean;
    safeAreaInset?: SafeAreaInsetType;
    screenSize:ScaledSize;
    equality?: equalityFunctionEnum.shallow;
}

export interface ScreenUtilInitilizeParams extends ScreenUtilOption, ScreenUtilDesignSize {

}
