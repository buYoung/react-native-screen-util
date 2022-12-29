export const enum ResponsiveMarginParamEnum {
    default,
    All,
    HorizonVertical,
    WordDefault,
    WordAll,
    WordHorizonVertical
}
export type ResponsiveMarginType = {
    marginTop?: number,
    marginBottom?: number,
    marginRight?: number,
    marginLeft?: number,
    marginVertical?: number,
    marginHorizontal?: number
};
export type ResponsiveMarginParamOriginal = {
    union?: ResponsiveMarginParamEnum.default
    marginTop?: number,
    marginBottom?: number,
    marginRight?: number,
    marginLeft?: number,
    marginHorizontal?: never
    marginVertical?: never,
    margin?: never
    m?: never,
    mh?: never,
    mv?: never
    mt?: never,
    mb?: never,
    ml?: never,
    mr?: never,
};
export type ResponsiveMarginParamOriginalAll = {
    union?: ResponsiveMarginParamEnum.All
    margin: number,
    marginTop?: never,
    marginBottom?: never,
    marginRight?: never,
    marginLeft?: never,
    marginHorizontal?: never
    marginVertical?: never,
    m?: never,
    mh?: never,
    mv?: never
    mt?: never,
    mb?: never,
    ml?: never,
    mr?: never,
};
export type ResponsiveMarginParamOriginalHorizontalVertical = {
    union?: ResponsiveMarginParamEnum.HorizonVertical
    margin?: never,
    marginTop?: never,
    marginBottom?: never,
    marginRight?: never,
    marginLeft?: never,
    marginHorizontal?: number
    marginVertical?: number,
    m?: never,
    mh?: never,
    mv?: never
    mt?: never,
    mb?: never,
    ml?: never,
    mr?: never,
};
export type ResponsiveMarginParamWordAll = {
    union?: ResponsiveMarginParamEnum.WordAll,
    m: number,
    mh?: never,
    mv?: never
    mt?: never,
    mb?: never,
    ml?: never,
    mr?: never,
    margin?: never,
    marginTop?: never,
    marginBottom?: never,
    marginRight?: never,
    marginLeft?: never,
    marginHorizontal?: never
    marginVertical?: never,

};
export type ResponsiveMarginParamWord = {
    union?: ResponsiveMarginParamEnum.WordDefault,
    m?: never,
    mt?: number,
    mb?: number,
    ml?: number,
    mr?: number,
    mh?: never,
    mv?: never,
    margin?: never,
    marginTop?: never,
    marginBottom?: never,
    marginRight?: never,
    marginLeft?: never,
    marginHorizontal?: never
    marginVertical?: never,

};
export type ResponsiveMarginParamWordhv = {
    union?: ResponsiveMarginParamEnum.WordHorizonVertical,
    m?: never,
    mh?: number,
    mv?: number,
    mt?: never,
    mb?: never,
    ml?: never,
    mr?: never,
    margin?: never,
    marginTop?: never,
    marginBottom?: never,
    marginRight?: never,
    marginLeft?: never,
    marginHorizontal?: never
    marginVertical?: never,
};

export type ResponsiveMarginParam<T = ResponsiveMarginParamOriginal | ResponsiveMarginParamOriginalHorizontalVertical | ResponsiveMarginParamOriginalAll  |  ResponsiveMarginParamWord | ResponsiveMarginParamWordAll | ResponsiveMarginParamWordhv> = T;
