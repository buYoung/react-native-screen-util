import { NativeModules } from "react-native";

if(!NativeModules.ScreenUtill) {
    console.log("error not load Native Module.... insetUtil");
} else {
    console.log("get inset!", NativeModules.ScreenUtill.getSafeAreaInsets);
}

export * from "./const";
export * from "./screen_util";
export * from "./library/lodash";


declare global {
    interface Number {
        width(): number;
        w(): number
        height(): number;

        h(): number;

        fontSize(): number;

        sp(): number;

        marginTop(): number;

        marginBottom(): number;

        marginLeft(): number;

        marginRight(): number;

        mt(): number;

        mb(): number;

        ml(): number;

        mr(): number;

        paddingTop(): number;

        paddingBottom(): number;

        paddingLeft(): number;

        paddingRight(): number;

        pt(): number;

        pb(): number;

        pl(): number;

        pr(): number;
    }
}