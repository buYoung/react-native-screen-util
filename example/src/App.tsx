import * as React from "react";
import { Dimensions } from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ResponsiveProvider } from "react-native-screen-util";
import MainHome from "../src/Main";


export default function App(): JSX.Element {
    return (
        <ResponsiveProvider option={{
            width        : 390, // Design Sample Size Iphone 14
            height       : 844,
            safeArea     : true,
            minTextSize  : true,
            scaleByHeight: false,
            screenSize   : Dimensions.get("screen")
        }} loading={true} autoInset={true}>
            <MainHome/>
        </ResponsiveProvider>
    );
}
