import { ScreenResponsiveStore } from "react-native-screen-utill";


Number.prototype.fontSize    = function (): number {
    const value = Number(this);
    try {
        const currentState = ScreenResponsiveStore.getState();
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getFont(value);
    } catch (e) {
        return value;
    }
};
Number.prototype.sp          = function (): number {
    const value = Number(this);
    try {
        const currentState = ScreenResponsiveStore.getState();
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getFont(value);
    } catch (e) {
        return value;
    }
};

export {};