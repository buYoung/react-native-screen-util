export const enum ResponsiveDimensionUnionParamEnum {
    Default,
    Word
}
export type ResponsiveDimensionParamType = {
    width?: number;
    height?: number;
};
export type ResponsiveWidthParamOriginalType = {
    union?: ResponsiveDimensionUnionParamEnum.Default;
    width?: number;
    w?: never;
    height?: number;
    h?: never;
};

export type ResponsiveWidthParamWordType = {
    union?: ResponsiveDimensionUnionParamEnum.Word;
    w?: number;
    width?: never;
    h?: number;
    height?: never;
};
export type ResponsiveDimensionParams<T = ResponsiveWidthParamOriginalType | ResponsiveWidthParamWordType> = T;
