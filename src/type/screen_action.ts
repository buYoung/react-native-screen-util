import type { OrientationType } from "./orientation";
import type { setStateResultType } from "./result";
import type { SafeAreaInsetType } from "./safeArea";
import type { ScreenUtilInitilizeParams } from "./screen_util";
import type { screenResponsiveState } from "../type/screen_state";
export interface screenResponsiveGetterAction {
    getDefaultStyle(): ScreenUtilInitilizeParams;
    getInitialize(): Promise<boolean>;
    getOrientation(): OrientationType;
    getSafeArea(): SafeAreaInsetType | undefined;
    getSpacing(value: number): number;
}

export interface screenResponsiveCheckerAction {
    checkIfValueIsNull<T>(value: T): boolean;
    checkNumberIsAllowRange(value: number): boolean;
}

export interface screenResponsiveSetterAction {
    setScreenResponsiveInitialize(option?: ScreenUtilInitilizeParams): Promise<setStateResultType>;
    setScreenSizeRatio(): setStateResultType;
    setScreenSafeInset(): Promise<setStateResultType>;
}
export interface screenResponsiveSetterActionPrivate {
    copyData(data: screenResponsiveState): void;
}

export type screenResponsiveActionUnion = screenResponsiveGetterAction &
    screenResponsiveCheckerAction &
    screenResponsiveSetterAction;
export type screenResponsiveActionUnionPrivate = screenResponsiveGetterAction &
    screenResponsiveCheckerAction &
    screenResponsiveSetterActionPrivate;
