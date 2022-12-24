export const marginType = {
    marginTop       : "marginTop",
    marginBottom    : "marginBottom",
    marginRight     : "marginRight",
    marginLeft      : "marginLeft",
    marginHorizontal: "marginHorizontal",
    marginVertical  : "marginVertical",
    mt              : "marginTop",
    mb              : "marginBottom",
    ml              : "marginLeft",
    mr              : "marginRight",
    mh              : "marginHorizontal",
    mv              : "marginVertical"
};

export type marginType = typeof marginType[keyof typeof marginType];
export type marginParamOriginal = {
    marginTop?: number, marginBottom?: number, marginRight?: number, marginLeft?: number,
};
export type marginParamOriginalAll = {
    margin: number
};
export type marginParamOriginalHorizontalVertical = {
    marginHorizontal?: number
    marginVertical?: number,
};
export type marginParamOriginalHorizontal = {
    marginHorizontal?: number
};
export type marginParamOriginalVertical = {
    marginVertical?: number,
};
export type marginParamWordAll = {
    m: number
};
export type marginParamWord = {
    mt?: number, mb?: number, ml?: number, mr?: number,
};
export type marginParamWordhv = {
    mh?: number, mv?: number
};
export type marginParamWordh = {
    mh?: number,
};
export type marginParamWordv = {
    mv?: number
};

export type marginParam<T extends marginParamOriginal | marginParamOriginalHorizontalVertical | marginParamOriginalAll  | marginParamOriginalHorizontal | marginParamOriginalVertical | marginParamWord | marginParamWordAll | marginParamWordhv | marginParamWordh | marginParamWordv> = T;

// interface Number<T extends marginParamOriginal | marginParamOriginalHorizontalVertical | marginParamOriginalHorizontal | marginParamOriginalVertical | marginParamWord | marginParamWordhv | marginParamWordh | marginParamWordv> {
//     margin(value: marginParam<marginParamOriginal | marginParamWord | marginParamWordhv | marginParamOriginalHorizontalVertical>): T
//
//     marginHorizontal(value: marginParam<marginParamOriginalHorizontal | marginParamWordh>): T
//
//     marginVertical(value: marginParam<marginParamOriginal | marginParamWordv>): T
//
//     m(value: marginParam<marginParamOriginal | marginParamWord>): T
//
//     mh(value: marginParam<marginParamOriginal | marginParamWord>): T
//
//     mv(value: marginParam<marginParamOriginal | marginParamWord>): T
//
//     marginTop(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginTop"]: number }
//
//     marginBottom(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginBottom"]: number }
//
//     marginLeft(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginLeft"]: number }
//
//     marginRight(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginRight"]: number }
//
//     mt(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginTop"]: number }
//
//     mb(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginBottom"]: number }
//
//     ml(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginLeft"]: number }
//
//     mr(value: marginParam<marginParamOriginal | marginParamWord>): { [marginType in "marginRight"]: number }
// }
