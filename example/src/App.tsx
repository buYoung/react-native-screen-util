import * as React from "react";
import { Dimensions } from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScreenResponsiveProvider } from "react-native-screen-util";
import MainHome from "../src/Main";

export default function App(): JSX.Element {
    return (
        <ScreenResponsiveProvider
            option={{
                width: 390, // Design Sample Size Iphone 14
                height: 750,
                safeArea: true,
                minTextSize: true,
                scaleByHeight: false,
                screenSize: Dimensions.get("window")
            }}
            loading={true}
            autoInset={true}>
            <MainHome />
        </ScreenResponsiveProvider>
    );
}
