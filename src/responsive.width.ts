import { _scaleSize } from "./screen_util";
import { checkIsNullOrNotInitilized } from "./util";
import "./index";
Number.prototype.w           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return Math.round(_scaleSize.width * value);
};
Number.prototype.width       = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return Math.round(_scaleSize.width * value);
};