import storePrivate from "responsive/storePrivate";


Number.prototype.fontSize    = function (): number {
    const value = Number(this);
    try {
        const currentState = storePrivate.get();
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
        const currentState = storePrivate.get();
        if(!currentState.checkNumberIsAllowRange(value)) {
            return value;
        }
        return currentState._____getFont(value);
    } catch (e) {
        return value;
    }
};

export {};