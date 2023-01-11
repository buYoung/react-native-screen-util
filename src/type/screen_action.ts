import type { OrientationType } from "./orientation";
import type { setStateResultType } from "./result";
import type { SafeAreaInsetType } from "./safeArea";
import type { ScreenUtilInitilizeParams } from "./screen_util";
import type { ResponsiveState } from "../type/screen_state";
export interface ResponsiveGetterAction {
    getDefaultStyle(): ScreenUtilInitilizeParams;
    getInitialize(): Promise<boolean>;
    getOrientation(): OrientationType;
    getSafeArea(): SafeAreaInsetType | undefined;
    getSpacing(value: number): number;
}

export interface ResponsiveCheckAction {
    checkIfValueIsNull<T>(value: T): boolean;
    checkNumberIsAllowRange(value: number): boolean;
}

export interface ResponsiveSetterAction {
    setScreenResponsiveInitialize(option?: ScreenUtilInitilizeParams): Promise<setStateResultType>;
    setScreenSizeRatio(): setStateResultType;
    setScreenReScreeenSizeRatio(width: number, height: number): setStateResultType;
    setScreenSafeInset(): Promise<setStateResultType>;
}
export interface ResponsiveSetterActionPrivate {
    copyData(data: ResponsiveState): void;
}

export type ResponsiveActionUnion = ResponsiveGetterAction & ResponsiveCheckAction & ResponsiveSetterAction;
export type ResponsiveActionUnionPrivate = ResponsiveGetterAction &
    ResponsiveCheckAction &
    ResponsiveSetterActionPrivate;
