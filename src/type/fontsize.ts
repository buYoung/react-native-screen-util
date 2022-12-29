export const enum ResponsiveFontParamEnum {
    default,
    word
}
export type ResponsiveFontSizeType = {
    fontSize?: number
};
export type ResponsiveFontSizeTypeParamOriginal = {
    union?: ResponsiveFontParamEnum.default
    fontSize?: number
    sp?: never
};

export type ResponsiveFontSizeTypeParamWordOriginal = {
    union?: ResponsiveFontParamEnum.word
    sp?: number
    fontSize?: never
};



export type ResponsiveFontSizeFontUnion = ResponsiveFontSizeTypeParamOriginal | ResponsiveFontSizeTypeParamWordOriginal;