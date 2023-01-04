export const enum ResponsivePaddingParamEnum {
    default,
    All,
    HorizonVertical,
    WordDefault,
    WordAll,
    WordHorizonVertical
}
export type ResponsivePaddingType = {
    paddingTop?: number;
    paddingBottom?: number;
    paddingRight?: number;
    paddingLeft?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
};
export type ResponsivePaddingParamOriginal = {
    union?: ResponsivePaddingParamEnum.default;
    paddingTop?: number;
    paddingBottom?: number;
    paddingRight?: number;
    paddingLeft?: number;
    paddingHorizontal?: never;
    paddingVertical?: never;
    padding?: never;
    p?: never;
    ph?: never;
    pv?: never;
    pt?: never;
    pb?: never;
    pl?: never;
    pr?: never;
};
export type ResponsivePaddingParamOriginalAll = {
    union?: ResponsivePaddingParamEnum.All;
    padding: number;
    paddingTop?: never;
    paddingBottom?: never;
    paddingRight?: never;
    paddingLeft?: never;
    paddingHorizontal?: never;
    paddingVertical?: never;
    p?: never;
    ph?: never;
    pv?: never;
    pt?: never;
    pb?: never;
    pl?: never;
    pr?: never;
};
export type ResponsivePaddingParamOriginalHorizontalVertical = {
    union?: ResponsivePaddingParamEnum.HorizonVertical;
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingRight?: never;
    paddingLeft?: never;
    paddingHorizontal?: number;
    paddingVertical?: number;
    p?: never;
    ph?: never;
    pv?: never;
    pt?: never;
    pb?: never;
    pl?: never;
    pr?: never;
};
export type ResponsivePaddingParamWordAll = {
    union?: ResponsivePaddingParamEnum.WordAll;
    p: number;
    ph?: never;
    pv?: never;
    pt?: never;
    pb?: never;
    pl?: never;
    pr?: never;
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingRight?: never;
    paddingLeft?: never;
    paddingHorizontal?: never;
    paddingVertical?: never;
};
export type ResponsivePaddingParamWord = {
    union?: ResponsivePaddingParamEnum.WordDefault;
    p?: never;
    pt?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    ph?: never;
    pv?: never;
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingRight?: never;
    paddingLeft?: never;
    paddingHorizontal?: never;
    paddingVertical?: never;
};
export type ResponsivePaddingParamWordhv = {
    union?: ResponsivePaddingParamEnum.WordHorizonVertical;
    p?: never;
    ph?: number;
    pv?: number;
    pt?: never;
    pb?: never;
    pl?: never;
    pr?: never;
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingRight?: never;
    paddingLeft?: never;
    paddingHorizontal?: never;
    paddingVertical?: never;
};

export type ResponsivePaddingParam<
    T =
        | ResponsivePaddingParamOriginal
        | ResponsivePaddingParamOriginalHorizontalVertical
        | ResponsivePaddingParamOriginalAll
        | ResponsivePaddingParamWord
        | ResponsivePaddingParamWordAll
        | ResponsivePaddingParamWordhv
> = T;
