import { scaleConst } from "../../screen_util";
import { checkIsNullOrNotInitilized } from "../../util";


Number.prototype.fontSize    = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }

    return scaleConst.font * value;
};
Number.prototype.sp          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return scaleConst.font * value;
};

export {};