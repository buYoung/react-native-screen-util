import type { NamedStyles, responsiveAllowListCircle } from "./type";
import {
    responsiveAllowList,
    responsiveAllowListCircleKeys,
    responsiveAllowListKeys,
    responsiveCreateEnum
} from "./type";
import { ResponsiveStore } from "../storePrivate";

export type screenSizeChangeProps = {
    width: number;
    height: number;
};
type storeType = typeof ResponsiveStore.store;
// type onSizeChange = {
//     (
//         listener: (
//             selectedState: ScreemResponsiveStoreUnionPrivate,
//             previousSelectedState: ScreemResponsiveStoreUnionPrivate
//         ) => void
//     ): () => void;
//     <U>(
//         selector: (state: ScreemResponsiveStoreUnionPrivate) => U,
//         listener: (selectedState: U, previousSelectedState: U) => void,
//         options?:
//             | {
//                   equalityFn?: ((a: U, b: U) => boolean) | undefined;
//                   fireImmediately?: boolean | undefined;
//               }
//             | undefined
//     ): () => void;
// };
class ResponsiveStyleSheetInstance {
    store: storeType;
    create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T {
        const subscribe = this.store.subscribe(
            (state) => state.screenSize,
            (state, prev) => {
                if (state.width === prev.width && state.height === prev.height) {
                    return;
                }
                // console.log("state,/**/ change", state, prev);
                subscribe();
                this.create(styles);
            }
        );
        return this._styleParse(styles);
    }
    _styleParse<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T {
        if (typeof styles !== "object") {
            return styles;
        }
        try {
            const keys = Object.getOwnPropertyNames(styles);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const keysInkeys = Object.getOwnPropertyNames(styles[key]);
                if (!keysInkeys) {
                    continue;
                }
                if (keysInkeys.length <= 0) {
                    continue;
                }
                let isFindCircle = false;
                const checkCircle: Record<string, number> = {
                    width: 0,
                    height: 0,
                    borderRadius: 0
                };
                for (let j = 0; j < keysInkeys.length; j++) {
                    const inkey = keysInkeys[j];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const value = styles[key][inkey];
                    if (!value) {
                        continue;
                    }
                    if (typeof value !== "number") {
                        continue;
                    }
                    const findKeyName = responsiveAllowListCircleKeys.findIndex((v) => v === inkey);
                    if (findKeyName < 0) {
                        continue;
                    }
                    const findKey = responsiveAllowListCircleKeys[findKeyName];
                    checkCircle[findKey] = value;
                }
                isFindCircle = this.isCircle(checkCircle);
                if (!isFindCircle) {
                    isFindCircle = this.isSameDimension(checkCircle);
                }
                for (let j = 0; j < keysInkeys.length; j++) {
                    const inkey = keysInkeys[j];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const value = styles[key][inkey];
                    if (!value) {
                        continue;
                    }
                    if (typeof value !== "number") {
                        continue;
                    }
                    const findKeyName = responsiveAllowListKeys.findIndex((v) => v === inkey);
                    if (findKeyName < 0) {
                        continue;
                    }
                    switch (responsiveAllowList[responsiveAllowListKeys[findKeyName]]) {
                        case responsiveCreateEnum.width:
                            if (isFindCircle) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                styles[key][inkey] = ResponsiveStore._____getCircle(value);
                            } else {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                styles[key][inkey] = ResponsiveStore._____getWidth(value);
                            }
                            break;
                        case responsiveCreateEnum.height:
                            if (isFindCircle) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                styles[key][inkey] = ResponsiveStore._____getCircle(value);
                            } else {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                styles[key][inkey] = ResponsiveStore._____getHeight(value);
                            }
                            break;
                        case responsiveCreateEnum.mixin:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getMixin(value);
                            break;
                        case responsiveCreateEnum.fontSize:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getFont(value);
                            break;
                        case responsiveCreateEnum.margin:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getSpacing(value);
                            break;
                        case responsiveCreateEnum.padding:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getSpacing(value);
                            break;
                        case responsiveCreateEnum.borderRadius:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getCircle(value);
                            break;
                        case responsiveCreateEnum.borderWidth:
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            styles[key][inkey] = ResponsiveStore._____getMixin(value);
                            break;
                        default:
                            break;
                    }
                }
            }
            return styles;
        } catch (e) {
            return styles;
        }
    }
    isCircle(checkCircle: typeof responsiveAllowListCircle): boolean {
        try {
            if (checkCircle.width !== checkCircle.height) {
                return false;
            }
            if (checkCircle.width === 0 && checkCircle.height === 0 && checkCircle.borderRadius === 0) {
                return false;
            }
            return checkCircle.width / 2 === checkCircle.borderRadius;
        } catch (e) {
            return false;
        }
    }
    isSameDimension(checkCircle: typeof responsiveAllowListCircle): boolean {
        try {
            if (checkCircle.width !== checkCircle.height) {
                return false;
            }
            return !(checkCircle.width === 0 && checkCircle.height === 0);
        } catch (e) {
            return false;
        }
    }
    constructor() {
        this.store = ResponsiveStore.store;
    }
}

const ResponsiveStyleSheet = new ResponsiveStyleSheetInstance();

export { ResponsiveStyleSheet };
