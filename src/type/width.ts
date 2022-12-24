export const WidthType = {
    width: "width",
    w    : "width"

};
export type WidthType = typeof WidthType[keyof typeof WidthType];

export type WidthParamOriginal = {
    width?: number
};

export type WidthParamWord = {
    w?: number
};
export type WidthParam<T = WidthParamOriginal | WidthParamWord> = T;

interface Number<T = WidthParamOriginal | WidthParamWord> {
    width(value: WidthParam<WidthParamOriginal | WidthParamWord>): T
    w(value: WidthParam<WidthParamOriginal | WidthParamWord>): { [WidthType in "width"]: number }
}
