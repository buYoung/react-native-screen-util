import type { ScaledSize } from "react-native";
import { Dimensions, NativeModules, StatusBar } from "react-native";
import { createStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Mutate, StoreApi } from "zustand/vanilla";
import { inRange, isString, isValueNumber, round } from "../library/lodash";
import type {
    SafeAreaInsetType,
    ResponsiveActionUnion,
    ResponsiveState,
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

// const enum DpiEnum {
//     ldpi = 36,
//     mdpi = 48,
//     hdpi = 72,
//     xhdpi = 96,
//     xxhdpi = 144,
//     xxxhdpi = 192
// }

// const Dpi: Record<DpiEnum, [number, number]> = {
//     [DpiEnum.ldpi]: [0.75, 0.99],
//     [DpiEnum.mdpi]: [1, 1.499],
//     [DpiEnum.hdpi]: [1.5, 2],
//     [DpiEnum.xhdpi]: [2, 3],
//     [DpiEnum.xxhdpi]: [3, 4],
//     [DpiEnum.xxxhdpi]: [4, 10]
// };

export type ResponsiveUnion = ResponsiveState & ResponsiveActionUnion;
export type ResponsiveStore = ReturnType<typeof createScreenResponsiveStore>;

export function createScreenResponsiveStore(): Mutate<
    StoreApi<ResponsiveUnion>,
    [["zustand/subscribeWithSelector", never]]
> {
    return createStore<ResponsiveUnion>()(
        subscribeWithSelector(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (set, get) => ({
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
                    try {
                        const currentState = get();
                        currentState.screenSize.width = width;
                        currentState.screenSize.height = height;
                        const screenSize: ScaledSize = { ...currentState.screenSize } as ScaledSize;

                        screenSize.width = width;
                        screenSize.height = height;
                        const defaultScale = { ...screenSize } as ScaledSize;
                        const fontScale = { ...screenSize } as ScaledSize;

                        const uiSize = {
                            ...{
                                uiWidth: currentState.uiWidth,
                                uiHeight: currentState.uiHeight
                            }
                        };
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
                            font: currentState.minTextSize ? Math.min(fontWidth, fontHeight) : fontWidth
                        });
                        return {
                            error: false,
                            message: "success"
                        };
                    } catch (e) {
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
                        let statusbar = StatusBar.currentHeight;
                        if (!statusbar) {
                            statusbar = 0;
                        }
                        const screenSize: ScaledSize = { ...currentState.screenSize } as ScaledSize;

                        screenSize.width = currentState.screenSize.width;
                        screenSize.height = currentState.screenSize.height - statusbar;

                        const defaultScale = { ...screenSize } as ScaledSize;
                        const fontScale = { ...screenSize } as ScaledSize;
                        const uiSize = {
                            ...{
                                uiWidth: currentState.uiWidth,
                                uiHeight: currentState.uiHeight
                            }
                        };
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
                            font: currentState.minTextSize ? Math.min(fontWidth, fontHeight) : fontWidth
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

function objectValueCheckIsNull<T>(currentState: ResponsiveUnion, value: T): boolean {
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
