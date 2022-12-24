import { _scaleSize } from "./screen_util";
import { checkIsNullOrNotInitilized } from "./util";
import "./index";
import { marginPadding } from "./macro";
Number.prototype.pl           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.pr           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.pt           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.pb           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.paddingLeft  = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.paddingRight = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.paddingTop   = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};
Number.prototype.paddingRight = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return marginPadding(value);
};