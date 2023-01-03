import type { ScaledSize } from "react-native";
import { Dimensions, NativeModules, Platform, StatusBar } from "react-native";
import { createStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { StoreApi, Mutate } from "zustand/vanilla";
import { inRange, isString, isValueNumber, round } from "../library/lodash";
import type {
    screenResponsiveState,
    SafeAreaInsetType,
    ScreenUtilInitilizeParams,
    setStateResultType,
    screenResponsiveActionUnion
} from "../type";
import { OrientationType } from "../type";
import "../responsive/extension";
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
export type ScreemResponsiveStoreUnion = screenResponsiveState & screenResponsiveActionUnion;

export function createScreenResponsiveStore(): Mutate<StoreApi<ScreemResponsiveStoreUnion>, [ [ "zustand/subscribeWithSelector", never ] ]> {
    return createStore<ScreemResponsiveStoreUnion>()(
        subscribeWithSelector(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (set, get, store) => ({
                screenUtilInitialize: false,
                orientation         : false,
                ...initializeState,
                getOrientation(): OrientationType {
                    const currentState = get();
                    if(!currentState.screenSize) {
                        return OrientationType.NONE;
                    }
                    if(isNaN(currentState.screenSize.width) || isNaN(currentState.screenSize.height)) {
                        console.log("isNan?", currentState.screenSize);
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
                            top        : 0,
                            bottom     : 0,
                            left       : 0,
                            right      : 0,
                            fontScale  : 0,
                            realWidth  : 0,
                            realHeight : 0,
                            screenScale: 0
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
                checkIfValueIsNull<T>(value: T): boolean {
                    // if(!get().screenUtilInitialize) return false;

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
                        if(!option) {
                            option = get().getDefaultStyle();
                        }
                        await get().setScreenSafeInset();
                        try {
                            const width     = option.width;
                            const height       = option.height;

                            set({
                                screenSize     : option.screenSize,
                                safeArea       : option.safeArea,
                                debug          : option.debug,
                                uiWidth        : width,
                                uiHeight       : height,
                                minTextSize    : option.minTextSize,
                                scaleByHeight  : option.scaleByHeight,
                                splitScreenMode: option.splitScreenMode
                            });
                            const setScreenSizeRatioResult = get().setScreenSizeRatio();
                            if(setScreenSizeRatioResult.error) {
                                return setScreenSizeRatioResult;
                            }
                        } catch (e) {
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
                                message: "dimension value is null"
                            };
                        }
                        const calcSafeAreaInset = getCalcSafeAreaInset((get() as screenResponsiveActionUnion), (currentState as screenResponsiveState));
                        if("error" in calcSafeAreaInset) {
                            return calcSafeAreaInset;
                        }
                        console.log("calcSafeAreaInset", calcSafeAreaInset, calcSafeAreaInset);
                        currentState.screenSize = calcSafeAreaInset;
                        const screenSize  = { ...currentState.screenSize };
                        const uiSize      = {...{
                            uiWidth : currentState.uiWidth,
                            uiHeight: currentState.uiHeight
                        }};
                        console.log("height1", screenSize.height, uiSize.uiHeight);
                        console.log("width", screenSize.width, uiSize.uiWidth);
                        screenSize.width /= uiSize.uiWidth;
                        screenSize.height /= uiSize.uiHeight;
                        console.log("height2", screenSize.height, screenSize.width);
                        screenSize.width  = round(screenSize.width, 3);
                        screenSize.height = round(screenSize.height, 3);
                        console.log("height3", screenSize.height);
                        set({
                            scaleWidth : screenSize.width,
                            scaleHeight: screenSize.height,
                            uiWidth    : currentState.uiWidth,
                            uiHeight   : currentState.uiHeight,
                            font       : currentState.minTextSize ? Math.min(screenSize.width, screenSize.height) : screenSize.width
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
                                        top        : 0,
                                        bottom     : 0,
                                        left       : 0,
                                        right      : 0,
                                        fontScale  : 0,
                                        realHeight : 0,
                                        realWidth  : 0,
                                        screenScale: 0
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
            })));
}
function getCalcSafeAreaInset(currentState: screenResponsiveActionUnion, state: screenResponsiveState): ScaledSize | setStateResultType {
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

    if(Platform.OS === "android") {
        const viewInfo = state.safeAreaInset;
        const heightInset = (viewInfo.top + viewInfo.bottom);
        const widthInset = (viewInfo.left + viewInfo.right);

        const height = viewInfo.realHeight;
        const width = viewInfo.realWidth;
        console.log(heightInset, (height + heightInset) / viewInfo.screenScale);
        console.log(widthInset, (width + widthInset) / viewInfo.screenScale);
        // state.screenSize.height = round((viewInfo.realHeight + (TopInset + state.safeAreaInset.bottom))  / viewInfo.screenScale, 3);
        if(currentState.getOrientation() === OrientationType.POTTRAIT) {
            state.screenSize.height = (height + heightInset) / viewInfo.screenScale;
            state.screenSize.width = (width + widthInset) / viewInfo.screenScale;
            return state.screenSize;
        }
        if(currentState.getOrientation() === OrientationType.LANDSCAPE) {
            state.screenSize.height = (height + heightInset) / viewInfo.screenScale;
            state.screenSize.width = (width + widthInset) / viewInfo.screenScale;
            return state.screenSize;
        }
    }
    if(Platform.OS === "ios") {
        if(currentState.getOrientation() === OrientationType.POTTRAIT) {
            state.screenSize.height += state.safeAreaInset.bottom;
            return state.screenSize;
        }
        if(currentState.getOrientation() === OrientationType.LANDSCAPE) {
            const max = Math.max(state.safeAreaInset.left, state.safeAreaInset.bottom, state.safeAreaInset.right);
            state.screenSize.width += max;
            return state.screenSize;
        }
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
    return result.includes(true);
}