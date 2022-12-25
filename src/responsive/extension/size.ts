import { scaleConst } from "../../screen_util";
import { checkIsNullOrNotInitilized } from "../../util";

function widthHelper(value:number): number {
    return Math.min(scaleConst.scaleWidth * value, scaleConst.screenSize.width);
}
function heightHelper(value:number): number {
    return Math.min(scaleConst.scaleHeight * value, scaleConst.screenSize.height);
}

Number.prototype.w           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return widthHelper(value);
};
Number.prototype.width       = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return widthHelper(value);
};
Number.prototype.h           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return heightHelper(value);
};
Number.prototype.height      = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return heightHelper(value);
};
export {};