import { NativeModules } from "react-native";
import { marginPadding } from "./macro";
import { _ScreenUtilInitilize, scaleConst } from "./screen_util";
import type { ScreenUtilInitilizeParams } from "./type";
import type { SafeAreaInsetType } from "./type/safeArea";
import { checkIsNullOrNotInitilized } from "./util";
declare global {
    interface Number {
        width(): number;
        w(): number
        height(): number;

        h(): number;

        fontSize(): number;

        sp(): number;

        marginTop(): number;

        marginBottom(): number;

        marginLeft(): number;

        marginRight(): number;

        mt(): number;

        mb(): number;

        ml(): number;

        mr(): number;

        paddingTop(): number;

        paddingBottom(): number;

        paddingLeft(): number;

        paddingRight(): number;

        pt(): number;

        pb(): number;

        pl(): number;

        pr(): number;
    }
}
Number.prototype.w           = function (): number {
    console.log("ddd?", scaleConst.scaleWidth, this);
    const value = Number(this);

    console.log("ddd?1", scaleConst.scaleWidth, value);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    console.log("ddd?2", scaleConst.scaleWidth, value);
    return scaleConst.scaleWidth * value;
};
Number.prototype.width       = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return scaleConst.scaleWidth * value;
};
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
Number.prototype.h           = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return scaleConst.scaleHeight * value;
};
Number.prototype.height      = function (): number {
    const value = Number(this);
    if(!checkIsNullOrNotInitilized(value)) {
        return value;
    }
    return scaleConst.scaleHeight * value;
};
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
export async function ScreenUtilInstall(option?: ScreenUtilInitilizeParams): Promise<Error | undefined> {

    if(!NativeModules.ScreenUtill) {
        return new Error("not load Native Module.... insetUtil");
    }
    try {
        const resultSafeArea = await getSafeArea();
        const keyList = Object.keys(resultSafeArea);
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            const val = resultSafeArea[key];
            if(!scaleConst.safeAreaInset) {
                scaleConst.safeAreaInset = {
                    bottom: 0,
                    left  : 0,
                    right : 0,
                    top   : 0
                };
            }
            scaleConst[key] = val;
        }

        const e = _ScreenUtilInitilize(option);
        if(e instanceof Error) {
            return e;
        }

        return undefined;
    } catch (e: any) {
        return e;
    }
}
async function getSafeArea(): Promise<SafeAreaInsetType> {
    return new Promise((resolve, reject) => {
        try {
            NativeModules.ScreenUtill.getSafeAreaInsets((v:SafeAreaInsetType) => {
                resolve(v);
            });
        } catch (e) {
            reject(e);
        }
    });
}
export * from "./const";
export * from "./screen_util";
export * from "./library/lodash";

export {};

console.log((30).w());