import { scaleConst } from "./screen_util";

export function marginPadding(value: number): number {
    if(!scaleConst.scaleWidth) {
        return value;
    }
    if(!scaleConst.scaleHeight) {
        return value;
    }
    return Math.min(scaleConst.scaleWidth, scaleConst.scaleHeight) * value;
}