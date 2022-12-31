import { ResponsiveStore } from "../";


Number.prototype.w           = function (): number {
    const value = Number(this);
    try {
        const currentState = ResponsiveStore;
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getWidth(value);
    } catch (e) {
        return value;
    }
};
Number.prototype.width       = function (): number {
    const value = Number(this);
    try {
        const currentState = ResponsiveStore;
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getWidth(value);
    } catch (e) {
        return value;
    }
};
Number.prototype.h           = function (): number {
    const value = Number(this);
    try {
        const currentState = ResponsiveStore;
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getHeight(value);
    } catch (e) {
        return value;
    }
};
Number.prototype.height      = function (): number {
    const value = Number(this);
    try {
        const currentState = ResponsiveStore;
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getHeight(value);
    } catch (e) {
        return value;
    }
};
export {};