import { ResponsiveStore } from "../";

import type {
    ResponsiveMarginParam,
    ResponsiveMarginType,
    ResponsivePaddingParam,
    ResponsivePaddingType
} from "../../type";
import { ResponsiveMarginParamEnum, ResponsivePaddingParamEnum } from "../../type";

export function margin<T extends ResponsiveMarginParam>(value: T): ResponsiveMarginType {
    let result: ResponsiveMarginType = {};
    try {
        result = marginHelper(value);
    } catch (e) {}
    return result;
}
export const m = margin;
export function padding<T extends ResponsivePaddingParam>(value: T): ResponsivePaddingType {
    let result: ResponsivePaddingType = {};
    try {
        result = paddingHelper(value);
    } catch (e) {}
    return result;
}
export const p = padding;
function marginHelper(value: ResponsiveMarginParam): ResponsiveMarginType {
    const result: ResponsiveMarginType = {};
    if (value.union === ResponsiveMarginParamEnum.default) {
        if (!value.marginTop) {
            return {};
        } else {
            result.marginTop = ResponsiveStore._____getSpacing(value.marginTop);
        }
        if (!value.marginBottom) {
            return {};
        } else {
            result.marginBottom = ResponsiveStore._____getSpacing(value.marginBottom);
        }
        if (!value.marginLeft) {
            return {};
        } else {
            result.marginLeft = ResponsiveStore._____getSpacing(value.marginLeft);
        }
        if (!value.marginRight) {
            return {};
        } else {
            result.marginRight = ResponsiveStore._____getSpacing(value.marginRight);
        }
    }
    if (value.union === ResponsiveMarginParamEnum.WordDefault) {
        if (!value.mt) {
            return {};
        } else {
            result.marginTop = ResponsiveStore._____getSpacing(value.mt);
        }
        if (!value.mb) {
            return {};
        } else {
            result.marginBottom = ResponsiveStore._____getSpacing(value.mb);
        }
        if (!value.ml) {
            return {};
        } else {
            result.marginLeft = ResponsiveStore._____getSpacing(value.ml);
        }
        if (!value.mr) {
            return {};
        } else {
            result.marginRight = ResponsiveStore._____getSpacing(value.mr);
        }
    }
    if (value.union === ResponsiveMarginParamEnum.All) {
        if (!value.margin) {
            return {};
        } else {
            const marginSpacing = ResponsiveStore._____getSpacing(value.margin);
            result.marginTop = marginSpacing;
            result.marginBottom = marginSpacing;
            result.marginLeft = marginSpacing;
            result.marginRight = marginSpacing;
        }
    }
    if (value.union === ResponsiveMarginParamEnum.WordAll) {
        if (!value.m) {
            return {};
        } else {
            const marginSpacing = ResponsiveStore._____getSpacing(value.m);
            result.marginTop = marginSpacing;
            result.marginBottom = marginSpacing;
            result.marginLeft = marginSpacing;
            result.marginRight = marginSpacing;
        }
    }
    if (value.union === ResponsiveMarginParamEnum.HorizonVertical) {
        if (!value.marginHorizontal) {
            return {};
        } else {
            result.marginHorizontal = ResponsiveStore._____getSpacing(value.marginHorizontal);
        }
        if (!value.marginVertical) {
            return {};
        } else {
            result.marginVertical = ResponsiveStore._____getSpacing(value.marginVertical);
        }
    }
    if (value.union === ResponsiveMarginParamEnum.WordHorizonVertical) {
        if (!value.mh) {
            return {};
        } else {
            result.marginHorizontal = ResponsiveStore._____getSpacing(value.mh);
        }
        if (!value.mv) {
            return {};
        } else {
            result.marginVertical = ResponsiveStore._____getSpacing(value.mv);
        }
    }

    return result;
}

function paddingHelper(value: ResponsivePaddingParam): ResponsivePaddingType {
    const result: ResponsivePaddingType = {};
    if (value.union === ResponsivePaddingParamEnum.default) {
        if (!value.paddingTop) {
            return {};
        } else {
            result.paddingTop = ResponsiveStore._____getSpacing(value.paddingTop);
        }
        if (!value.paddingBottom) {
            return {};
        } else {
            result.paddingBottom = ResponsiveStore._____getSpacing(value.paddingBottom);
        }
        if (!value.paddingLeft) {
            return {};
        } else {
            result.paddingLeft = ResponsiveStore._____getSpacing(value.paddingLeft);
        }
        if (!value.paddingRight) {
            return {};
        } else {
            result.paddingRight = ResponsiveStore._____getSpacing(value.paddingRight);
        }
    }
    if (value.union === ResponsivePaddingParamEnum.WordDefault) {
        if (!value.pt) {
            return {};
        } else {
            result.paddingTop = ResponsiveStore._____getSpacing(value.pt);
        }
        if (!value.pb) {
            return {};
        } else {
            result.paddingBottom = ResponsiveStore._____getSpacing(value.pb);
        }
        if (!value.pl) {
            return {};
        } else {
            result.paddingLeft = ResponsiveStore._____getSpacing(value.pl);
        }
        if (!value.pr) {
            return {};
        } else {
            result.paddingRight = ResponsiveStore._____getSpacing(value.pr);
        }
    }
    if (value.union === ResponsivePaddingParamEnum.All) {
        if (!value.padding) {
            return {};
        } else {
            const paddingSpacing = ResponsiveStore._____getSpacing(value.padding);
            result.paddingTop = paddingSpacing;
            result.paddingBottom = paddingSpacing;
            result.paddingLeft = paddingSpacing;
            result.paddingRight = paddingSpacing;
        }
    }
    if (value.union === ResponsivePaddingParamEnum.WordAll) {
        if (!value.p) {
            return {};
        } else {
            const paddingSpacing = ResponsiveStore._____getSpacing(value.p);
            result.paddingTop = paddingSpacing;
            result.paddingBottom = paddingSpacing;
            result.paddingLeft = paddingSpacing;
            result.paddingRight = paddingSpacing;
        }
    }
    if (value.union === ResponsivePaddingParamEnum.HorizonVertical) {
        if (!value.paddingHorizontal) {
            return {};
        } else {
            result.paddingHorizontal = ResponsiveStore._____getSpacing(value.paddingHorizontal);
        }
        if (!value.paddingVertical) {
            return {};
        } else {
            result.paddingVertical = ResponsiveStore._____getSpacing(value.paddingVertical);
        }
    }
    if (value.union === ResponsivePaddingParamEnum.WordHorizonVertical) {
        if (!value.ph) {
            return {};
        } else {
            result.paddingHorizontal = ResponsiveStore._____getSpacing(value.ph);
        }
        if (!value.pv) {
            return {};
        } else {
            result.paddingVertical = ResponsiveStore._____getSpacing(value.pv);
        }
    }

    return result;
}
