import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle | any };
export const enum responsiveCreateEnum {
    width,
    height,
    fontSize,
    margin,
    padding
}
export const responsiveAllowList:Record<string, responsiveCreateEnum> = {
    width            : responsiveCreateEnum.width,
    height           : responsiveCreateEnum.height,
    fontSize         : responsiveCreateEnum.fontSize,
    margin           : responsiveCreateEnum.margin,
    marginTop        : responsiveCreateEnum.margin,
    marginBottom     : responsiveCreateEnum.margin,
    marginRight      : responsiveCreateEnum.margin,
    marginLeft       : responsiveCreateEnum.margin,
    marginVertical   : responsiveCreateEnum.margin,
    marginHorizontal : responsiveCreateEnum.margin,
    padding          : responsiveCreateEnum.padding,
    paddingTop       : responsiveCreateEnum.padding,
    paddingBottom    : responsiveCreateEnum.padding,
    paddingRight     : responsiveCreateEnum.padding,
    paddingLeft      : responsiveCreateEnum.padding,
    paddingVertical  : responsiveCreateEnum.padding,
    paddingHorizontal: responsiveCreateEnum.padding
};
export const responsiveAllowListKeys = Object.freeze(Object.getOwnPropertyNames(responsiveAllowList));


export type responsiveStyleSheetOption = {
    freeze: boolean
};