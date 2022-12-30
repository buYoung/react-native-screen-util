import type { ScaledSize } from "react-native";
import { Dimensions, NativeModules, Platform, StatusBar } from "react-native";
import { createStore } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { inRange, isString, isValueNumber, round } from "../library/lodash";
import type {
    screenResponsiveState,
    SafeAreaInsetType, ScreenUtilDesignSizeDefault,
    ScreenUtilInitilizeParams, setStateResultType,
    debugScreenResponsiveAction, debugScreenResponsiveState, screenResponsiveActionUnion
} from "../type";
import { OrientationType } from "../type";
import "./responsive/extension";
const initializeState = {
    safeAreaInset  : {
        top   : 0,
        bottom: 0,
        left  : 0,
        right : 0
    },
    screenSize  : {
        width    : 0,
        height   : 0,
        scale    : 0,
        fontScale: 0
    },
    scaleHeight    : 0,
    scaleWidth     : 0,
    debug          : true,
    minTextSize    : true,
    safeArea       : true,
    scaleByHeight  : false,
    splitScreenMode: false,
    uiWidth        : 360,
    uiHeight       : 690,
    font           : 0
};
type ScreemResponsiveStoreUnion = screenResponsiveState & screenResponsiveActionUnion;
export type ScreenResponsiveStore = ReturnType<typeof createScreenResponsiveStore>;

export const storeDebug = createStore<debugScreenResponsiveState & debugScreenResponsiveAction >()((set, get) => ({
    debug               : false,
    getDebugStatus: (): boolean => {
        return get().debug;
    },
    startDebugResponsive : (): void => {
        set({debug : true});
    },
    stopDebugResponsive : (): void => {
        set({debug : false});
    }
}));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createScreenResponsiveStore(initProps?: Partial<screenResponsiveState>) {

    return createStore<ScreemResponsiveStoreUnion>()(
        devtools(
            subscribeWithSelector(
                (set, get) => ({
                    screenUtilInitialize: false,
                    orientation         : false,
                    ...initializeState,
                    ...initProps,
                    getOrientation(): OrientationType {
                        const currentState = get();
                        if(!currentState.screenSize) {
                            return OrientationType.NONE;
                        }
                        const orientationState = currentState.screenSize.width < currentState.screenSize.height;
                        if(orientationState) {
                            return OrientationType.POTTRAIT;
                        }
                        return OrientationType.LANDSCAPE;

                    },
                    getInitialize : async (): Promise<boolean> => {
                        let promiseCheckTimer = -1;
                        return new Promise((resolve): void => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            promiseCheckTimer = setInterval(() => {
                                if(!get().screenUtilInitialize) {
                                    return;
                                }
                                resolve(true);
                                clearInterval(promiseCheckTimer);
                            }, 500);
                        });
                    },
                    getSpacing(value: number): number {
                        const currentState = get();
                        if(!currentState.scaleWidth) {
                            return value;
                        }
                        if(!currentState.scaleHeight) {
                            return value;
                        }
                        return Math.min(currentState.scaleWidth, currentState.scaleHeight) * value;
                    },
                    getSafeArea(): SafeAreaInsetType | undefined {
                        const safeAreaInset = get().safeAreaInset;
                        if(!get().safeAreaInset) {
                            return undefined;
                        }
                        return safeAreaInset;
                    },
                    getDefaultStyle(): ScreenUtilInitilizeParams {
                        return {
                            height       : 0,
                            width        : 0,
                            safeAreaInset: {
                                top   : 0,
                                bottom: 0,
                                left  : 0,
                                right : 0
                            },
                            screenSize     : Dimensions.get("window"),
                            scaleHeight    : 0,
                            scaleWidth     : 0,
                            debug          : true,
                            minTextSize    : true,
                            safeArea       : true,
                            scaleByHeight  : false,
                            splitScreenMode: false,
                            uiWidth        : 360,
                            uiHeight       : 690,
                            font           : 0
                        } as ScreenUtilInitilizeParams;
                    },

                    _____getFont(value: number): number {
                        const font = get().font;
                        if(!numberValueCheckIsNull(font)) {
                            return value;
                        }
                        return font * value;
                    },
                    _____getWidth(value: number): number {
                        const currentState = get();
                        const screenWidth = currentState.scaleWidth;
                        const screenSizeWidth = currentState.screenSize.width;
                        if(!numberValueCheckIsNull(screenWidth)) {
                            return value;
                        }
                        if(!numberValueCheckIsNull(screenSizeWidth)) {
                            return value;
                        }
                        return Math.min(screenWidth * value, screenSizeWidth);
                    },
                    _____getHeight(value: number): number {
                        const currentState = get();
                        const screenHeight = currentState.scaleHeight;
                        const screenSizeHeight = currentState.screenSize.height;
                        if(!numberValueCheckIsNull(screenHeight)) {
                            return value;
                        }
                        if(!numberValueCheckIsNull(screenSizeHeight)) {
                            return value;
                        }
                        return Math.min(screenHeight * value, screenSizeHeight);
                    },
                    _____getSpacing(value: number): number {
                        const currentState = get();
                        const screenWidth = currentState.scaleWidth;
                        const screenHeight = currentState.scaleHeight;
                        if(!numberValueCheckIsNull(screenHeight)) {
                            return value;
                        }
                        if(!numberValueCheckIsNull(screenWidth)) {
                            return value;
                        }
                        return Math.min(screenWidth, screenHeight) * value;
                    },
                    checkIfValueIsNull<T>(value: T): boolean {
                        if(!get().screenUtilInitialize) return false;

                        switch (typeof value) {
                            case "string":
                                return value !== "";
                            case "boolean":
                                return value;
                            case "number":
                                return numberValueCheckIsNull(value);
                            case "object":
                                return objectValueCheckIsNull(get(), value);
                            case "bigint":
                            case "function":
                            case "symbol":
                            case "undefined":
                            default:
                                return false;
                        }
                    },
                    checkNumberIsAllowRange(value: number): boolean {
                        if(!get().screenUtilInitialize) return false;
                        return isValueNumber(value) && inRange(value, 1, 10000);
                    },
                    async setScreenResponsiveInitialize(option?: ScreenUtilInitilizeParams): Promise<setStateResultType> {
                        if(!NativeModules.ScreenUtill) {
                            return {
                                error  : true,
                                message: "not load Native Module.... insetUtil"
                            };
                        }
                        try {
                            const e = _ScreenUtilInitilize(option, get(), set);
                            if(e.error) {
                                return makeErrorResult(e);
                            }
                            set({ screenUtilInitialize : true });
                            return {
                                error  : false,
                                message: "success"
                            };
                        } catch (e: any) {
                            return makeErrorResult(e);
                        }
                    },
                    setScreenSizeRatio(): setStateResultType {
                        try {
                            const currentState      = get();
                            if(!get().checkIfValueIsNull(currentState.screenSize)) {
                                return {
                                    error  : true,
                                    message: "dimension value is nulll"
                                };
                            }
                            const calcSafeAreaInset = getCalcSafeAreaInset(get(), currentState);
                            if("error" in calcSafeAreaInset) {
                                return calcSafeAreaInset;
                            }
                            currentState.screenSize = calcSafeAreaInset;
                            const screenSize  = { ...currentState.screenSize };
                            const uiSize      = {...{
                                uiWidth : currentState.uiWidth,
                                uiHeight: currentState.uiHeight
                            }};
                            screenSize.width /= uiSize.uiWidth;
                            screenSize.height /= uiSize.uiHeight;
                            screenSize.width  = round(screenSize.width, 3);
                            screenSize.height = round(screenSize.height, 3);
                            set({
                                screenSize: screenSize,
                                uiWidth   : currentState.uiWidth,
                                uiHeight  : currentState.uiHeight,
                                font      : currentState.minTextSize ? Math.min(screenSize.width, screenSize.height) : screenSize.width
                            });
                            return {
                                error  : false,
                                message: "success"
                            };
                        } catch (e) {
                            return makeErrorResult(e);
                        }
                    },
                    setScreenSafeInset(): Promise<setStateResultType> {
                        return new Promise((resolve) => {
                            try {
                                NativeModules.ScreenUtill.getSafeAreaInsets((v: SafeAreaInsetType) => {
                                    try {
                                        const keyList          = Object.keys(v);
                                        const setSafeAreaInset = {
                                            top   : 0,
                                            bottom: 0,
                                            left  : 0,
                                            right : 0
                                        } as SafeAreaInsetType;
                                        for (let i = 0; i < keyList.length; i++) {
                                            const key = keyList[i] as keyof typeof v;
                                            setSafeAreaInset[key] = v[key];
                                        }

                                        set(({ safeAreaInset : setSafeAreaInset }));
                                        resolve({
                                            error  : false,
                                            message: "success"
                                        });
                                    } catch (e) {
                                        return resolve(makeErrorResult(e));
                                    }
                                });
                            } catch (e) {
                                return resolve(makeErrorResult(e));
                            }
                        });
                    }
                })
            ), {
                name   : "responsive",
                enabled: true
            }
        )
    );
}
function getCalcSafeAreaInset(currentState: ScreemResponsiveStoreUnion, state: ScreenUtilDesignSizeDefault): ScaledSize | setStateResultType {
    if(!state.safeArea) {
        return {
            error  : true,
            message: "safeArea is not Enabled"
        };
    }
    if(!state.safeAreaInset) {
        return {
            error  : true,
            message: "safeAreaInset Is null"
        };
    }
    if(!currentState.checkIfValueIsNull(state.safeAreaInset)) {
        return {
            error  : true,
            message: "safeAreaInset Is null"
        };
    }
    const statusBarHeight = StatusBar.currentHeight;
    if(currentState.getOrientation() === OrientationType.POTTRAIT) {
        let TopInset = Platform.select({
            android: state.safeAreaInset.top,
            ios    : 0
        });
        if(!TopInset) {
            TopInset = 0;
        }
        state.screenSize.height += (TopInset + state.safeAreaInset.bottom);
        return state.screenSize;
    }
    if(currentState.getOrientation() === OrientationType.LANDSCAPE) {
        let LeftInset = Platform.select({
            android: state.safeAreaInset.left,
            ios    : 0
        });
        if(!LeftInset) {
            LeftInset = 0;
        }
        state.screenSize.width += (LeftInset + state.safeAreaInset.right);
        return state.screenSize;
    }
    if(!statusBarHeight) {
        return {
            error  : true,
            message: "react native statusBar is Null"
        };
    }
    state.screenSize.height += statusBarHeight;
    return state.screenSize;
}

function makeErrorResult(e: any): setStateResultType {
    let message = "error";
    if(isString(e)) {
        e = message;
    }
    message = e.message;
    return {
        error  : false,
        message: message
    };
}

export function numberValueCheckIsNull(value: number): boolean {

    return isValueNumber(value) && inRange(value, 1, 10000);
}

function objectValueCheckIsNull<T>(currentState: ScreemResponsiveStoreUnion, value: T): boolean {
    if(!value) {
        return false;
    }
    const freezeKey         = Object.freeze(value);
    const freezeValues      = Object.values(freezeKey);
    const result: boolean[] = [];

    for (let i = 0; i < freezeValues.length; i++) {
        result.push(currentState.checkIfValueIsNull(freezeValues[i]));
    }
    return !result.includes(false);
}

function _ScreenUtilInitilize(option?: ScreenUtilInitilizeParams, currentState: ScreemResponsiveStoreUnion, set: Partial<ScreemResponsiveStoreUnion>): setStateResultType {
    if(!option) {
        option = currentState.getDefaultStyle();
    }
    try {
        const width     = option.width;
        const height    = option.height;
        set({
            safeArea       : option.safeArea,
            debug          : option.debug,
            uiWidth        : width,
            uiHeight       : height,
            minTextSize    : option.minTextSize,
            scaleByHeight  : option.scaleByHeight,
            splitScreenMode: option.splitScreenMode
        });
        return currentState.setScreenSizeRatio();
    } catch (e) {
        return makeErrorResult(e);
    }
}