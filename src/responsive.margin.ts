import { _scaleSize } from "./screen_util";
import { checkIsNullOrNotInitilized } from "./util";
import "./index";
import { marginPadding } from "./macro";
Number.prototype.ml          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.mr          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.mt          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.mb          = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.marginLeft  = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.marginRight = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.marginTop   = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.marginRight = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};