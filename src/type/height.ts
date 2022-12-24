export const HeightType = {
    height: "height",
    h     : "height"

};
export type HeightType = typeof HeightType[keyof typeof HeightType];

export type HeightParamOriginal = {
    height?: number
};

export type HeightParamWord = {
    h?: number
};
export type HeightParam<T extends HeightParamOriginal | HeightParamWord> = T;
