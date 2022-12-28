import { NativeModules } from "react-native";
import { safeArea } from "./const";
import { _ScreenUtilInitilize, scaleConst } from "./screen_util";
import type { ScreenUtilInitilizeParams } from "./type";
import type { SafeAreaInsetType } from "./type/safeArea";
import "./responsive/extension";
export async function ScreenUtilInstall(option?: ScreenUtilInitilizeParams): Promise<Error | undefined> {
    if(!NativeModules.ScreenUtill) {
        return new Error("not load Native Module.... insetUtil");
    }
    try {
        const resultSafeArea = await getSafeArea();
        const keyList = Object.keys(resultSafeArea);
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i] as keyof typeof resultSafeArea;
            const val = resultSafeArea[key];
            if(!scaleConst.safeAreaInset) {
                scaleConst.safeAreaInset = {
                    bottom: 0,
                    left  : 0,
                    right : 0,
                    top   : 0
                };
            }
            safeArea[key] = val;
            scaleConst.safeAreaInset[key] = val;
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