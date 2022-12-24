export const FontType = {
    fontSize: "fontSize",
    sp      : "fontSize"

};
export type FontType = typeof FontType[keyof typeof FontType];

export type fontParamOriginal = {
    fontSize?: number
};

export type fontParamWord = {
    sp?: number
};
export type fontParam<T extends fontParamOriginal | fontParamWord> = T;


