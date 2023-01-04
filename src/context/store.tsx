import type { ScaledSize } from "react-native";
import { Dimensions, NativeModules, PixelRatio, Platform, StatusBar } from "react-native";
import { createStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Mutate, StoreApi } from "zustand/vanilla";
import { inRange, isString, isValueNumber, round } from "../library/lodash";
import type {
    SafeAreaInsetType,
    screenResponsiveActionUnion,
    screenResponsiveState,
    ScreenUtilInitilizeParams,
    setStateResultType
} from "../type";
import { OrientationType } from "../type";
import "../responsive/extension";

const initializeState = {
    safeAreaInset: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    screenSize: {
        width: 0,
        height: 0,
        scale: 0,
        fontScale: 0
    },
    mainUI: { width: 0, height: 0 },
    scaleHeight: 0,
    scaleWidth: 0,
    debug: true,
    minTextSize: true,
    safeArea: true,
    scaleByHeight: false,
    splitScreenMode: false,
    uiWidth: 360,
    uiHeight: 690,
    font: 0
};

const enum DpiEnum {
    ldpi = 36,
    mdpi = 48,
    hdpi = 72,
    xhdpi = 96,
    xxhdpi = 144,
    xxxhdpi = 192
}

const Dpi: Record<DpiEnum, [number, number]> = {
    [DpiEnum.ldpi]: [0.75, 0.99],
    [DpiEnum.mdpi]: [1, 1.499],
    [DpiEnum.hdpi]: [1.5, 2],
    [DpiEnum.xhdpi]: [2, 3],
    [DpiEnum.xxhdpi]: [3, 4],
    [DpiEnum.xxxhdpi]: [4, 10]
};

export type ScreemResponsiveStoreUnion = screenResponsiveState & screenResponsiveActionUnion;

export function createScreenResponsiveStore(): Mutate<
    StoreApi<ScreemResponsiveStoreUnion>,
    [["zustand/subscribeWithSelector", never]]
> {
    return createStore<ScreemResponsiveStoreUnion>()(
        subscribeWithSelector(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (set, get, store) => ({
                screenUtilInitialize: false,
                orientation: false,
                ...initializeState,
                getOrientation(): OrientationType {
                    const currentState = get();
                    if (!currentState.screenSize) {
                        return OrientationType.NONE;
                    }
                    if (isNaN(currentState.screenSize.width) || isNaN(currentState.screenSize.height)) {
                        return OrientationType.NONE;
                    }
                    const orientationState = currentState.screenSize.width < currentState.screenSize.height;
                    if (orientationState) {
                        return OrientationType.POTTRAIT;
                    }
                    return OrientationType.LANDSCAPE;
                },
                getInitialize: async (): Promise<boolean> => {
                    let promiseCheckTimer = -1;
                    return new Promise((resolve): void => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        promiseCheckTimer = setInterval(() => {
                            if (!get().screenUtilInitialize) {
                                return;
                            }
                            resolve(true);
                            clearInterval(promiseCheckTimer);
                        }, 500);
                    });
                },
                getSpacing(value: number): number {
                    const currentState = get();
                    if (!currentState.scaleWidth) {
                        return value;
                    }
                    if (!currentState.scaleHeight) {
                        return value;
                    }
                    return Math.min(currentState.scaleWidth, currentState.scaleHeight) * value;
                },
                getSafeArea(): SafeAreaInsetType | undefined {
                    const safeAreaInset = get().safeAreaInset;
                    if (!get().safeAreaInset) {
                        return undefined;
                    }
                    return safeAreaInset;
                },
                getDefaultStyle(): ScreenUtilInitilizeParams {
                    return {
                        height: 0,
                        width: 0,
                        mainUI: { width: 0, height: 0 },
                        safeAreaInset: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            fontScale: 0,
                            realWidth: 0,
                            realHeight: 0,
                            screenScale: 0
                        },
                        screenSize: Dimensions.get("window"),
                        scaleHeight: 0,
                        scaleWidth: 0,
                        debug: true,
                        minTextSize: true,
                        safeArea: true,
                        scaleByHeight: false,
                        splitScreenMode: false,
                        uiWidth: 360,
                        uiHeight: 690,
                        font: 0
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
                    if (!get().screenUtilInitialize) return false;
                    return isValueNumber(value) && inRange(value, 1, 10000);
                },
                async setScreenResponsiveInitialize(option?: ScreenUtilInitilizeParams): Promise<setStateResultType> {
                    if (!NativeModules.ScreenUtill) {
                        return {
                            error: true,
                            message: "not load Native Module.... insetUtil"
                        };
                    }

                    try {
                        if (!option) {
                            option = get().getDefaultStyle();
                        }
                        await get().setScreenSafeInset();
                        try {
                            const width = option.width;
                            const height = option.height;

                            set({
                                screenSize: option.screenSize,
                                safeArea: option.safeArea,
                                debug: option.debug,
                                uiWidth: width,
                                uiHeight: height,
                                minTextSize: option.minTextSize,
                                scaleByHeight: option.scaleByHeight,
                                splitScreenMode: option.splitScreenMode
                            });
                            const setScreenSizeRatioResult = get().setScreenSizeRatio();
                            if (setScreenSizeRatioResult.error) {
                                return setScreenSizeRatioResult;
                            }
                        } catch (e) {
                            return makeErrorResult(e);
                        }
                        set({ screenUtilInitialize: true });
                        return {
                            error: false,
                            message: "success"
                        };
                    } catch (e: any) {
                        return makeErrorResult(e);
                    }
                },
                setScreenReScreeenSizeRatio(width, height): setStateResultType {
                    console.log("다시 그림")
                    try {
                        const currentState = get();
                        currentState.screenSize.width = width;
                        currentState.screenSize.height = height;
                        const screenSize: ScaledSize = { ...currentState.screenSize } as ScaledSize;
                        // set(currentState);
                        screenSize.width = width;
                        screenSize.height = height;
                        const defaultScale = { ...screenSize } as ScaledSize;
                        const fontScale = { ...screenSize } as ScaledSize;
                        currentState.scaleWidth = width;
                        currentState.scaleHeight = height;
                        // const calcSafeAreaInset = getCalcSafeAreaInsetCalc(currentState);
                        // const calcSafeAreaInsetFont = getCalcSafeAreaInsetFontCalc(currentState);

                        const uiSize = {
                            ...{
                                uiWidth: currentState.uiWidth,
                                uiHeight: currentState.uiHeight
                            }
                        };

                        // console.log("일반", calcSafeAreaInset, calcSafeAreaInsetFont);
                        const getRatioWidth = round(defaultScale.width / uiSize.uiWidth, 3);
                        const getRatioHeight = round(defaultScale.height / uiSize.uiHeight, 3);
                        const getRatioFontWidth = round(fontScale.width / uiSize.uiWidth, 3);
                        const getRatioFontHeight = round(fontScale.height / uiSize.uiHeight, 3);
                        const orientation = currentState.getOrientation();
                        const ratio = PixelRatio.get();
                        if (Platform.OS === "android") {
                            if (orientation === OrientationType.POTTRAIT) {
                                const addDpivalue = getDpiRatioValue(getRatioHeight);
                                const addDpivalueFont = getDpiRatioValue(getRatioFontHeight);
                                defaultScale.height += addDpivalue / ratio;
                                fontScale.height += addDpivalueFont / ratio;
                            }
                            if (orientation === OrientationType.LANDSCAPE) {
                                const addDpivalue = getDpiRatioValue(getRatioWidth);
                                const addDpivalueFont = getDpiRatioValue(getRatioFontWidth);
                                defaultScale.width += addDpivalue / ratio;
                                fontScale.width += addDpivalueFont / ratio;
                            }
                        }

                        defaultScale.width = round(defaultScale.width / uiSize.uiWidth, 3);
                        defaultScale.height = round(defaultScale.height / uiSize.uiHeight, 3);
                        let fontWidth = round(fontScale.width / uiSize.uiWidth, 3);
                        let fontHeight = round(fontScale.height / uiSize.uiHeight, 3);
                        if (!fontWidth) {
                            fontWidth = defaultScale.width;
                        }
                        if (!fontHeight) {
                            fontHeight = defaultScale.height;
                        }
                        set({
                            scaleWidth: defaultScale.width,
                            scaleHeight: defaultScale.height,
                            font: PixelRatio.roundToNearestPixel(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                currentState.minTextSize ? Math.min(fontScale.width, fontScale.height) : fontScale.width
                            )
                        });
                        return {
                            error: false,
                            message: "success"
                        };
                    } catch (e) {
                        console.log(e);
                        return makeErrorResult(e);
                    }
                },
                setScreenSizeRatio(): setStateResultType {
                    try {
                        const currentState = get();
                        if (!get().checkIfValueIsNull(currentState.screenSize)) {
                            return {
                                error: true,
                                message: "dimension value is null"
                            };
                        }
                        const screenSize: ScaledSize = { ...currentState.screenSize } as ScaledSize;
                        // set(currentState);
                        screenSize.width = currentState.screenSize.width;
                        screenSize.height = currentState.screenSize.height;
                        const defaultScale = { ...screenSize } as ScaledSize;
                        const fontScale = { ...screenSize } as ScaledSize;
                        const calcSafeAreaInset = getCalcSafeAreaInset(
                            get() as screenResponsiveActionUnion,
                            currentState as screenResponsiveState
                        );
                        if ("error" in calcSafeAreaInset) {
                            return calcSafeAreaInset;
                        }
                        const calcSafeAreaInsetFont = getCalcSafeAreaInsetFont(
                            get() as screenResponsiveActionUnion,
                            currentState as screenResponsiveState
                        );
                        if ("error" in calcSafeAreaInsetFont) {
                            return calcSafeAreaInsetFont;
                        }
                        defaultScale.width -= calcSafeAreaInset.width;
                        defaultScale.height -= calcSafeAreaInset.height;
                        const uiSize = {
                            ...{
                                uiWidth: currentState.uiWidth,
                                uiHeight: currentState.uiHeight
                            }
                        };
                        const getRatioWidth = round(defaultScale.width / uiSize.uiWidth, 3);
                        const getRatioHeight = round(defaultScale.height / uiSize.uiHeight, 3);
                        const getRatioFontWidth = round(fontScale.width / uiSize.uiWidth, 3);
                        const getRatioFontHeight = round(fontScale.height / uiSize.uiHeight, 3);
                        const orientation = currentState.getOrientation();
                        const ratio = PixelRatio.get();
                        if (Platform.OS === "android") {
                            if (orientation === OrientationType.POTTRAIT) {
                                const addDpivalue = getDpiRatioValue(getRatioHeight);
                                const addDpivalueFont = getDpiRatioValue(getRatioFontHeight);
                                defaultScale.height += addDpivalue / ratio;
                                fontScale.height += addDpivalueFont / ratio;
                            }
                            if (orientation === OrientationType.LANDSCAPE) {
                                const addDpivalue = getDpiRatioValue(getRatioWidth);
                                const addDpivalueFont = getDpiRatioValue(getRatioFontWidth);
                                defaultScale.width += addDpivalue / ratio;
                                fontScale.width += addDpivalueFont / ratio;
                            }
                        }
                        defaultScale.width = round(defaultScale.width / uiSize.uiWidth, 3);
                        defaultScale.height = round(defaultScale.height / uiSize.uiHeight, 3);
                        let fontWidth = round(fontScale.width / uiSize.uiWidth, 3);
                        let fontHeight = round(fontScale.height / uiSize.uiHeight, 3);
                        if (!fontWidth) {
                            fontWidth = defaultScale.width;
                        }
                        if (!fontHeight) {
                            fontHeight = defaultScale.height;
                        }

                        set({
                            scaleWidth: defaultScale.width,
                            scaleHeight: defaultScale.height,
                            uiWidth: currentState.uiWidth,
                            uiHeight: currentState.uiHeight,
                            font: PixelRatio.roundToNearestPixel(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                currentState.minTextSize ? Math.min(fontScale.width, fontScale.height) : fontScale.width
                            )
                        });
                        return {
                            error: false,
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
                                    const keyList = Object.keys(v);
                                    const setSafeAreaInset = {
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        fontScale: 0,
                                        realHeight: 0,
                                        realWidth: 0,
                                        screenScale: 0
                                    } as SafeAreaInsetType;
                                    for (let i = 0; i < keyList.length; i++) {
                                        const key = keyList[i] as keyof typeof v;
                                        setSafeAreaInset[key] = v[key];
                                    }

                                    set({ safeAreaInset: setSafeAreaInset });

                                    resolve({
                                        error: false,
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
        )
    );
}
function getDpiRatioValue(value: number): number {
    const dpiKeyList = Object.getOwnPropertyNames(Dpi);
    for (let i = 0; i < dpiKeyList.length; i++) {
        const key = dpiKeyList[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const val = Dpi[key];
        if (inRange(value, val[0], val[1])) {
            return parseInt(key);
        }
    }
    return 0;
}
function getCalcSafeAreaInset(
    currentState: screenResponsiveActionUnion,
    state: screenResponsiveState
): ScaledSize | setStateResultType {
    if (!state.safeArea) {
        return {
            error: true,
            message: "safeArea is not Enabled"
        };
    }
    if (!state.safeAreaInset) {
        return {
            error: true,
            message: "safeAreaInset Is null"
        };
    }
    if (!currentState.checkIfValueIsNull(state.safeAreaInset)) {
        return {
            error: true,
            message: "safeAreaInset Is null"
        };
    }
    let statusBarHeight = StatusBar.currentHeight;
    if (!statusBarHeight) {
        statusBarHeight = 0;
    }
    const ratio = PixelRatio.get();
    const orientation = currentState.getOrientation();
    if (Platform.OS === "android") {
        const viewInfo = state.safeAreaInset;
        let heightInset = viewInfo.bottom + viewInfo.top;
        let widthInset = viewInfo.right + viewInfo.left;
        if (orientation === OrientationType.POTTRAIT) {
            heightInset += viewInfo.top * ratio;
            widthInset = 0;
        }
        if (orientation === OrientationType.LANDSCAPE) {
            widthInset += viewInfo.left * ratio;
            heightInset = 0;
        }
        console.log(heightInset, widthInset);
        return {
            width:widthInset,
            height: heightInset,
            fontScale: state.screenSize.fontScale,
            scale: state.screenSize.scale
        };
    }
    if (Platform.OS === "ios") {
        if (orientation === OrientationType.POTTRAIT) {

            return {
                width: 0,
                height: state.safeAreaInset.bottom / ratio,
                fontScale: state.screenSize.fontScale,
                scale: state.screenSize.scale
            };
        }
        if (orientation === OrientationType.LANDSCAPE) {
            const max = Math.max(state.safeAreaInset.left, state.safeAreaInset.bottom, state.safeAreaInset.right);
            state.screenSize.width += max / ratio;
            return {
                width: max / ratio,
                height: 0,
                fontScale: state.screenSize.fontScale,
                scale: state.screenSize.scale
            };
        }
    }
    if (!statusBarHeight) {
        return {
            error: true,
            message: "react native statusBar is Null"
        };
    }
    return {
        width:0,
        height: statusBarHeight,
        fontScale: state.screenSize.fontScale,
        scale: state.screenSize.scale
    };
}

// function getCalcSafeAreaInsetCalc(state: ScreemResponsiveStoreUnion): ScaledSize {
//     if (!state.safeArea) {
//         throw {
//             error: true,
//             message: "safeArea is not Enabled"
//         };
//     }
//     if (!state.safeAreaInset) {
//         throw {
//             error: true,
//             message: "safeAreaInset Is null"
//         };
//     }
//     if (!state.checkIfValueIsNull(state.safeAreaInset)) {
//         throw {
//             error: true,
//             message: "safeAreaInset Is null"
//         };
//     }
//     let statusBarHeight = StatusBar.currentHeight;
//     if (!statusBarHeight) {
//         statusBarHeight = 0;
//     }
//     const ratio = PixelRatio.get();
//     if (Platform.OS === "android") {
//         const viewInfo = state.safeAreaInset;
//         let heightInset = viewInfo.top;
//         let widthInset = viewInfo.left;
//         if (state.getOrientation() === OrientationType.POTTRAIT) {
//             heightInset = heightInset / ratio;
//         }
//         if (state.getOrientation() === OrientationType.LANDSCAPE) {
//             widthInset = widthInset / ratio;
//         }
//         return {
//             width: widthInset,
//             height: heightInset,
//             fontScale: state.screenSize.fontScale,
//             scale: state.screenSize.scale
//         };
//     }
//     if (Platform.OS === "ios") {
//         if (state.getOrientation() === OrientationType.POTTRAIT) {
//
//             return {
//                 width: 0,
//                 height: state.safeAreaInset.bottom / ratio,
//                 fontScale: state.screenSize.fontScale,
//                 scale: state.screenSize.scale
//             };
//         }
//         if (state.getOrientation() === OrientationType.LANDSCAPE) {
//             const max = Math.max(state.safeAreaInset.left, state.safeAreaInset.bottom, state.safeAreaInset.right);
//             return {
//                 width: max / ratio,
//                 height: 0,
//                 fontScale: state.screenSize.fontScale,
//                 scale: state.screenSize.scale
//             };
//         }
//     }
//     if (!statusBarHeight) {
//         throw {
//             error: true,
//             message: "react native statusBar is Null"
//         };
//     }
//     return {
//         width:0,
//         height: statusBarHeight,
//         fontScale: state.screenSize.fontScale,
//         scale: state.screenSize.scale
//     };
// }

function getCalcSafeAreaInsetFont(
    currentState: screenResponsiveActionUnion,
    state: screenResponsiveState
): ScaledSize | setStateResultType {
    if (!state.safeArea) {
        return {
            error: true,
            message: "safeArea is not Enabled"
        };
    }
    if (!state.safeAreaInset) {
        return {
            error: true,
            message: "safeAreaInset Is null"
        };
    }
    if (!currentState.checkIfValueIsNull(state.safeAreaInset)) {
        return {
            error: true,
            message: "safeAreaInset Is null"
        };
    }
    let statusBarHeight = StatusBar.currentHeight;
    if (!statusBarHeight) {
        statusBarHeight = 0;
    }
    const ratio = PixelRatio.getFontScale();
    const orientation = currentState.getOrientation()
    if (Platform.OS === "android") {
        const viewInfo = state.safeAreaInset;
        let heightInset = viewInfo.bottom;
        let widthInset = viewInfo.right;
        if (orientation === OrientationType.POTTRAIT) {
            heightInset = heightInset / ratio;
            widthInset = 0;
        }
        if (orientation === OrientationType.LANDSCAPE) {
            widthInset = widthInset / ratio;
            heightInset = 0;
        }
        return {
            width: widthInset,
            height: heightInset,
            fontScale: state.screenSize.fontScale,
            scale: state.screenSize.scale
        };
    }
    if (Platform.OS === "ios") {
        if (orientation === OrientationType.POTTRAIT) {
            return {
                width: 0,
                height: state.safeAreaInset.bottom / ratio,
                fontScale: state.screenSize.fontScale,
                scale: state.screenSize.scale
            };
        }
        if (orientation === OrientationType.LANDSCAPE) {
            const max = Math.max(state.safeAreaInset.left, state.safeAreaInset.bottom, state.safeAreaInset.right);
            return {
                width: max / ratio,
                height: 0,
                fontScale: state.screenSize.fontScale,
                scale: state.screenSize.scale
            };
        }
    }
    if (!statusBarHeight) {
        return {
            error: true,
            message: "react native statusBar is Null"
        };
    }
    return {
        width:0,
        height: statusBarHeight,
        fontScale: state.screenSize.fontScale,
        scale: state.screenSize.scale
    };
}

// function getCalcSafeAreaInsetFontCalc(state: ScreemResponsiveStoreUnion): ScaledSize {
//     if (!state.safeArea) {
//         throw {
//             error: true,
//             message: "safeArea is not Enabled"
//         };
//     }
//     if (!state.safeAreaInset) {
//         throw {
//             error: true,
//             message: "safeAreaInset Is null"
//         };
//     }
//     if (!state.checkIfValueIsNull(state.safeAreaInset)) {
//         throw {
//             error: true,
//             message: "safeAreaInset Is null"
//         };
//     }
//     let statusBarHeight = StatusBar.currentHeight;
//     if (!statusBarHeight) {
//         statusBarHeight = 0;
//     }
//     const ratio = PixelRatio.getFontScale();
//     if (Platform.OS === "android") {
//         const viewInfo = state.safeAreaInset;
//         let heightInset = viewInfo.bottom;
//         let widthInset = viewInfo.right;
//         if (state.getOrientation() === OrientationType.POTTRAIT) {
//             heightInset -= heightInset / ratio;
//         }
//         if (state.getOrientation() === OrientationType.LANDSCAPE) {
//             widthInset -= widthInset / ratio;
//         }
//
//         return {
//             width:widthInset,
//             height: heightInset,
//             fontScale: state.screenSize.fontScale,
//             scale: state.screenSize.scale
//         };;
//     }
//     if (Platform.OS === "ios") {
//         if (state.getOrientation() === OrientationType.POTTRAIT) {
//             return {
//                 width:0,
//                 height: state.safeAreaInset.bottom / ratio,
//                 fontScale: state.screenSize.fontScale,
//                 scale: state.screenSize.scale
//             };
//         }
//         if (state.getOrientation() === OrientationType.LANDSCAPE) {
//             const max = Math.max(state.safeAreaInset.left, state.safeAreaInset.bottom, state.safeAreaInset.right);
//             state.screenSize.width += max / ratio;
//             return {
//                 width:max / ratio,
//                 height: 0,
//                 fontScale: state.screenSize.fontScale,
//                 scale: state.screenSize.scale
//             };
//         }
//     }
//     if (!statusBarHeight) {
//         throw {
//             error: true,
//             message: "react native statusBar is Null"
//         };
//     }
//     state.screenSize.height += statusBarHeight;
//     return {
//         width:0,
//         height: statusBarHeight,
//         fontScale: state.screenSize.fontScale,
//         scale: state.screenSize.scale
//     };
// }

function makeErrorResult(e: any): setStateResultType {
    let message = "error";
    if (isString(e)) {
        e = message;
    }
    message = e.message;
    return {
        error: false,
        message: message
    };
}

export function numberValueCheckIsNull(value: number): boolean {
    return isValueNumber(value) && inRange(value, 1, 10000);
}

function objectValueCheckIsNull<T>(currentState: ScreemResponsiveStoreUnion, value: T): boolean {
    if (!value) {
        return false;
    }
    const freezeKey = Object.freeze(value);
    const freezeValues = Object.values(freezeKey);
    const result: boolean[] = [];

    for (let i = 0; i < freezeValues.length; i++) {
        result.push(currentState.checkIfValueIsNull(freezeValues[i]));
    }
    return result.includes(true);
}
