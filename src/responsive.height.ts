import { _scaleSize } from "./screen_util";
import { checkIsNullOrNotInitilized } from "./util";
import "./index";
Number.prototype.h           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return Math.round(_scaleSize.height * value);
};
Number.prototype.height      = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return Math.round(_scaleSize.height * value);
};