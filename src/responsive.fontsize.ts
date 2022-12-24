import { _scaleSize } from "./screen_util";
import { checkIsNullOrNotInitilized } from "./util";
import "./index";
Number.prototype.fontSize    = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }

    return Math.round(_scaleSize.font * value);
};
Number.prototype.sp          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return Math.round(_scaleSize.font * value);
};