import inRange from "lodash/inRange";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent, ViewStyle } from "react-native";
import { ActivityIndicator, InteractionManager, Platform, StyleSheet, View } from "react-native";
import shallow from "zustand/shallow";
import { loadingStyleSheet } from "./loading";
import { AreEqualProvider, ResponsiveProvider } from "./providers";
import type { ResponsiveStore } from "./store";
import { createScreenResponsiveStore } from "./store";
import type { EqualityFunctionStore } from "../library";
import { createEqualityFunctionStore, Else, Fallback, If, Then } from "../library";
import { ResponsiveStore as ResponsivePrivateStore } from "../responsive";
import type { equalityFunctionStore, ResponsiveState, ScreenUtilDesignSize } from "../type";
import { equalityFunctionEnum, OrientationType } from "../type";

type responsiveContainerStyle = {
    responsiveContainer: ViewStyle;
};
type responsiveContainerStyle2 = {
    rootView: ViewStyle;
};
const rootViewStyle = StyleSheet.create<responsiveContainerStyle2>({
    rootView: {
        flexGrow: 1
    }
});

export interface ScreenResponsiveProvider {
    option: ScreenUtilDesignSize;
    loading: boolean;
    autoInset: boolean;
}
type ScreenResponsiveProviderProps = React.PropsWithChildren<ScreenResponsiveProvider>
export function ScreenResponsiveProvider({
    children,
    option,
    loading,
    autoInset
}: ScreenResponsiveProviderProps): JSX.Element {
    const [getAreEqual, setAreEqual] = useState<[Function, equalityFunctionEnum]>([
        shallow,
        equalityFunctionEnum.shallow
    ]);
    const [getAutoInset, setAutoInset] = useState(
        StyleSheet.create<responsiveContainerStyle>({
            responsiveContainer: {
                flexGrow: 1,
                backgroundColor: "green"
            }
        })
    );
    const storeRef = useRef<ResponsiveStore>();
    if (!storeRef.current) {
        storeRef.current = createScreenResponsiveStore();
    }
    const areEqualStoreRef = useRef<EqualityFunctionStore>();
    if (!areEqualStoreRef.current) {
        areEqualStoreRef.current = createEqualityFunctionStore();
    }
    if (!option.equality) {
        option.equality = equalityFunctionEnum.shallow;
    }

    useEffect(() => {
        let unSubcribeResponsive: () => void;
        let unSubcribeAreEqual: () => void;
        InteractionManager.runAfterInteractions(async () => {
            const responsiveRefCurrent = storeRef.current;
            const areEqualRefCurrent = areEqualStoreRef.current;
            if (!responsiveRefCurrent) {
                return;
            }
            if (!areEqualRefCurrent) {
                return;
            }
            const result = await responsiveRefCurrent.getState().setScreenResponsiveInitialize(option);
            if (result.error) {
                return;
            }
            if (autoInset && Platform.OS === "ios") {
                const orientation = responsiveRefCurrent.getState().getOrientation();
                if (orientation === OrientationType.POTTRAIT) {
                    setAutoInset(
                        StyleSheet.create<responsiveContainerStyle>({
                            responsiveContainer: {
                                flexGrow: 1,
                                top: ResponsivePrivateStore._____getInset(orientation)
                            }
                        })
                    );
                }
                if (orientation === OrientationType.LANDSCAPE) {
                    setAutoInset(
                        StyleSheet.create<responsiveContainerStyle>({
                            responsiveContainer: {
                                flexGrow: 1,
                                left: ResponsivePrivateStore._____getInset(orientation)
                            }
                        })
                    );
                }
            }
            unSubcribeResponsive = responsiveRefCurrent.subscribe(
                (state: ResponsiveState) => state,
                (state) => {
                    ResponsivePrivateStore.getAction().copyData(state);
                },
                {
                    equalityFn: (a, b) => getAreEqual[0](a, b),
                    fireImmediately: true
                }
            );
            unSubcribeAreEqual = areEqualRefCurrent.subscribe(
                (state: equalityFunctionStore) => state,
                (next, _prev) => {
                    if (next.type === getAreEqual[1]) {
                        return;
                    }
                    setAreEqual([next.areEqual, next.type]);
                },
                {
                    equalityFn: (a, b) => getAreEqual[0](a, b)
                }
            );
        });
        return () => {
            unSubcribeResponsive();
            unSubcribeAreEqual();
        };
    }, []);

    const getSize = useCallback((event: LayoutChangeEvent) => {
        if (!storeRef.current) {
            return;
        }
        if (inRange(event.nativeEvent.layout.height, 0, 100)) {
            return;
        }
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        storeRef.current.getState().setScreenReScreeenSizeRatio(width, height);
    }, []);

    return (
        <AreEqualProvider value={areEqualStoreRef.current}>
            <View style={rootViewStyle.rootView} onLayout={getSize}>
                <ResponsiveProvider value={storeRef.current}>
                    <If condition={loading}>
                        <Then>
                            <If condition={storeRef.current.getState().getInitialize()} keepAlive={true}>
                                <Fallback>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        <ActivityIndicator style={loadingStyleSheet.loading} />
                                    }
                                </Fallback>
                                <Then>
                                    {(): any => {
                                        return (
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            <View style={getAutoInset.responsiveContainer} onLayout={getSize}>
                                                {children}
                                            </View>
                                        );
                                    }}
                                </Then>
                            </If>
                        </Then>
                        <Else>
                            {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <View style={getAutoInset.responsiveContainer} onLayout={getSize}>
                                    {children}
                                </View>
                            }
                        </Else>
                    </If>
                </ResponsiveProvider>
            </View>
        </AreEqualProvider>
    );
}
