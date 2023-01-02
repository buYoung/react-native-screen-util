import { Dimensions } from "react-native";
import { numberValueCheckIsNull } from "react-native-screen-util";
import create from "zustand";
import { inRange, isValueNumber } from "../library";
import type {
    SafeAreaInsetType, screenResponsiveActionUnionPrivate, screenResponsiveState, ScreenUtilInitilizeParams
} from "../type";
import { OrientationType } from "../type";
import "./extension";

export {};
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
    store = create<ScreemResponsiveStoreUnionPrivate>()(
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
                if(!data.screenUtilInitialize) {
                    return;
                }
                set(data);
            }
        })
    );
    getState():screenResponsiveState {
        return this.store.getState() as screenResponsiveState;
    }
    getAction():screenResponsiveActionUnionPrivate {
        return this.store.getState() as screenResponsiveActionUnionPrivate;
    }
    set(data: screenResponsiveState): void {
        this.store.setState(data);
    }
    _____getInset(orientation: OrientationType): number {
        const inset = this.getState().safeAreaInset;
        if(!inset) {
            return 0;
        }
        if(orientation === OrientationType.POTTRAIT) {
            const maxVal = Math.max(inset.top, inset.bottom);
            return this._____getHeight(maxVal);
        }
        if(orientation === OrientationType.LANDSCAPE) {
            if(inset.left === 0 && inset.right === 0) {
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
        if(!numberValueCheckIsNull(font)) {
            return value;
        }
        return font * value;
    }
    _____getWidth(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenSizeWidth = currentState.screenSize.width;
        if(!numberValueCheckIsNull(screenWidth)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenSizeWidth)) {
            return value;
        }
        return Math.min(screenWidth * value, screenSizeWidth);
    }
    _____getHeight(value: number): number {
        const currentState = this.store.getState();
        const screenHeight = currentState.scaleHeight;
        const screenSizeHeight = currentState.screenSize.height;
        if(!numberValueCheckIsNull(screenHeight)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenSizeHeight)) {
            return value;
        }
        return Math.min(screenHeight * value, screenSizeHeight);
    }
    _____getCircle(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenSizeWidth = currentState.screenSize.width;
        const screenHeight = currentState.scaleHeight;
        const screenSizeHeight = currentState.screenSize.height;
        if(!numberValueCheckIsNull(screenWidth)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenSizeWidth)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenHeight)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenSizeHeight)) {
            return value;
        }
        const width =  Math.min(screenWidth * value, screenSizeWidth);
        const height = Math.min(screenHeight * value, screenSizeHeight);
        return (width + height) / 2;
    }
    _____getSpacing(value: number): number {
        const currentState = this.store.getState();
        const screenWidth = currentState.scaleWidth;
        const screenHeight = currentState.scaleHeight;
        if(!numberValueCheckIsNull(screenHeight)) {
            return value;
        }
        if(!numberValueCheckIsNull(screenWidth)) {
            return value;
        }
        return Math.min(screenWidth, screenHeight) * value;
    }
    checkNumberIsAllowRange(value: number): boolean {
        if(!this.store.getState().screenUtilInitialize) return false;
        return isValueNumber(value) && inRange(value, 1, 10000);
    }
    constructor() {
        // this.store.subscribe((state, _prevState) => {
        //     console.log("private State Change", state);
        // });
    }

}
const ResponsiveStore = new responsivePrivateVarial();
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
export {
    ResponsiveStore
};