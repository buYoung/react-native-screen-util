import { Dimensions, PixelRatio } from "react-native";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { inRange, isValueNumber } from "../library";
import { onViewSizeChangeEvent } from "../library/event/bus";
import type {
    SafeAreaInsetType,
    ResponsiveActionUnionPrivate,
    ResponsiveState,
    ResponsiveStatePrivate,
    ScreenUtilInitilizeParams
} from "../type";
import { OrientationType } from "../type";
import "./extension";

export {};
const initializeState = {
    safeAreaInset: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        screenScale: 0
    },
    screenSize: {
        width: 0,
        height: 0,
        scale: 0,
        fontScale: 0
    },
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
export type ScreemResponsiveStoreUnionPrivate = ResponsiveStatePrivate & ResponsiveActionUnionPrivate;
class responsivePrivateVarial {
    store = create<ScreemResponsiveStoreUnionPrivate>()(
        subscribeWithSelector((set, get) => ({
            screenUtilInitialize: false,
            orientation: false,
            oldSize: { width: 0, height: 0 },
            nextSize: { width: 0, height: 0 },
            ...initializeState,
            getOrientation(): OrientationType {
                const currentState = get();
                if (!currentState.screenSize) {
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
                    safeAreaInset: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
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
                if (!get().screenUtilInitialize) return false;

                switch (typeof value) {
                    case "string":
                        return value !== "";
                    case "boolean":
                        return value;
                    case "number":
                        return this.checkNumberIsAllowRange(value);
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
            copyData(data: ResponsiveState): void {
                if (!data.screenUtilInitialize) {
                    return;
                }
                const state = get();
                const a = {
                    safeAreaInset: state.safeAreaInset,
                    safeArea: state.safeArea,
                    screenSize: state.screenSize,
                    scaleWidth: state.scaleWidth,
                    scaleHeight: state.scaleHeight,
                    font: state.font
                } as ResponsiveState;
                const b = {
                    safeAreaInset: data.safeAreaInset,
                    safeArea: data.safeArea,
                    screenSize: data.screenSize,
                    scaleWidth: data.scaleWidth,
                    scaleHeight: data.scaleHeight,
                    font: data.font
                } as ResponsiveState;
                const prev = {
                    width: a.screenSize.width,
                    height: a.screenSize.height
                };
                const next = {
                    width: b.screenSize.width,
                    height: b.screenSize.height
                };
                if (prev.width === next.width && prev.height === next.height) {
                    return;
                }
                onViewSizeChangeEvent.emit("change", [prev, next]);
                set(data);
            }
        }))
    );
    getState(): ResponsiveState {
        return this.store.getState() as ResponsiveState;
    }
    getAction(): ResponsiveActionUnionPrivate {
        return this.store.getState() as ResponsiveActionUnionPrivate;
    }
    set(data: ResponsiveState): void {
        this.store.setState(data);
    }
    _____getInset(orientation: OrientationType): number {
        const inset = this.getState().safeAreaInset;
        if (!inset) {
            return 0;
        }
        if (orientation === OrientationType.POTTRAIT) {
            const maxVal = Math.max(inset.top, inset.bottom);
            return this._____getHeight(maxVal);
        }
        if (orientation === OrientationType.LANDSCAPE) {
            if (inset.left === 0 && inset.right === 0) {
                const maxVal = Math.max(inset.top, inset.bottom);
                return this._____getWidth(maxVal);
            } else {
                const maxVal = Math.max(inset.left, inset.right);
                return this._____getWidth(maxVal);
            }
        }
        return 0;
    }
    _____getFont(value: number): number {
        const font = this.store.getState().font;
        if (font < 0) {
            return value;
        }
        return PixelRatio.roundToNearestPixel(font * value);
    }
    _____getWidth(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenSizeWidth = currentState.screenSize.width;
        if (screenWidth < 0) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeWidth)) {
            return value;
        }
        return PixelRatio.roundToNearestPixel(Math.min(screenWidth * value, screenSizeWidth));
    }
    _____getHeight(value: number): number {
        const currentState = this.store.getState();
        const screenHeight = currentState.scaleHeight;
        const screenSizeHeight = currentState.screenSize.height;
        if (screenHeight < 0) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeHeight)) {
            return value;
        }
        return PixelRatio.roundToNearestPixel(Math.min(value * screenHeight, screenSizeHeight));
    }
    _____getCircle(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenHeight = currentState.scaleHeight;
        const screenSizeWidth = currentState.screenSize.width;
        const screenSizeHeight = currentState.screenSize.height;
        if (screenWidth < 0) {
            return value;
        }
        if (screenHeight < 0) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeWidth)) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeHeight)) {
            return value;
        }
        const width = Math.min(screenWidth * value, screenSizeWidth);
        const height = Math.min(screenHeight * value, screenSizeHeight);
        return PixelRatio.roundToNearestPixel((width + height) / 2);
    }
    _____getMixin(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenHeight = currentState.scaleHeight;
        const screenSizeWidth = currentState.screenSize.width;
        const screenSizeHeight = currentState.screenSize.height;
        if (screenWidth < 0) {
            return value;
        }
        if (screenHeight < 0) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeWidth)) {
            return value;
        }
        if (!this.checkNumberIsAllowRange(screenSizeHeight)) {
            return value;
        }
        const width = Math.min(screenWidth * value, screenSizeWidth);
        const height = Math.min(screenHeight * value, screenSizeHeight);
        return PixelRatio.roundToNearestPixel((width + height) / 2);
    }
    _____getSpacing(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenHeight = currentState.scaleHeight;
        if (screenWidth < 0) {
            return value;
        }
        if (screenHeight < 0) {
            return value;
        }
        return PixelRatio.roundToNearestPixel(Math.min(screenWidth, screenHeight) * value);
    }
    checkNumberIsAllowRange(value: number): boolean {
        if (!this.store.getState().screenUtilInitialize) return false;
        return isValueNumber(value) && inRange(value, 1, 10000);
    }
}
const ResponsiveStore = new responsivePrivateVarial();
function objectValueCheckIsNull<T>(currentState: ScreemResponsiveStoreUnionPrivate, value: T): boolean {
    if (!value) {
        return false;
    }
    const freezeKey = Object.freeze(value);
    const freezeValues = Object.values(freezeKey);
    const result: boolean[] = [];

    for (let i = 0; i < freezeValues.length; i++) {
        result.push(currentState.checkIfValueIsNull(freezeValues[i]));
    }
    return !result.includes(false);
}
export { ResponsiveStore };
