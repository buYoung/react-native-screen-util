import type { OrientationType } from "./orientation";
import type { ScreenUtilInitilizeParams } from "./screen_util";
import type { setStateResultType } from "./result";
import type { SafeAreaInsetType } from "./safeArea";
export interface screenResponsiveGetterAction {
    getDefaultStyle(): ScreenUtilInitilizeParams,
    getInitialize(): Promise<boolean>,
    getOrientation(): OrientationType
    getSafeArea(): SafeAreaInsetType | undefined
    getSpacing(value: number): number
    _____getFont(value: number): number,
    _____getWidth(value: number): number,
    _____getHeight(value: number): number,
    _____getSpacing(value: number): number,
}

export interface screenResponsiveCheckerAction {
    checkIfValueIsNull<T>(value: T): boolean
    checkNumberIsAllowRange(value: number): boolean
}

export interface screenResponsiveSetterAction {
    setScreenResponsiveInitialize(option?: ScreenUtilInitilizeParams): Promise<setStateResultType>,
    setScreenSizeRatio(): setStateResultType,
    setScreenSafeInset(): Promise<setStateResultType>
}