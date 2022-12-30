import { inRange,  isValueNumber } from "library";
import { Dimensions } from "react-native";
import { numberValueCheckIsNull } from "react-native-screen-utill";
import type {
    SafeAreaInsetType,
    ScreenUtilInitilizeParams,
    screenResponsiveActionUnionPrivate,
    screenResponsiveState } from "type";
import { OrientationType } from "type";
import { createStore } from "zustand";
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
export type ScreemResponsiveStoreUnionPrivate = screenResponsiveState & screenResponsiveActionUnionPrivate;
class responsivePrivateVarial {
    store = createStore<ScreemResponsiveStoreUnionPrivate>()(
        (set, get) => ({
            screenUtilInitialize: false,
            orientation         : false,
            ...initializeState,
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
            copyData(data: screenResponsiveState):void {
                set(data);
            }
        })
    );
    get():ScreemResponsiveStoreUnionPrivate {
        return this.store.getState();
    }
    set(data: screenResponsiveState): void {
        this.store.setState(data);
    }
}
const responsivePrivate = new responsivePrivateVarial();
responsivePrivate.store.subscribe((state, prevState) => {
    console.log("private State Change", state, prevState);
});
function objectValueCheckIsNull<T>(currentState: ScreemResponsiveStoreUnionPrivate, value: T): boolean {
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

export default responsivePrivate;