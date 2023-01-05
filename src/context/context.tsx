import inRange from "lodash/inRange";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent, ViewProps, ViewStyle } from "react-native";
import { ActivityIndicator, InteractionManager, Platform, StyleSheet, View } from "react-native";
import type { Mutate } from "zustand";

import createContext from "zustand/context";
import shallow from "zustand/shallow";
import type { StoreApi } from "zustand/vanilla";
import { loadingStyleSheet } from "./loading";
import type { ScreemResponsiveStoreUnion } from "./store";
import { createScreenResponsiveStore } from "./store";
import type { EqualityFunctionUnion } from "../library";
import { createEqualityFunctionStore, Else, Fallback, If, Then } from "../library";
import { ResponsiveStore } from "../responsive";
import type { equalityFunctionStore, screenResponsiveState, ScreenUtilDesignSize } from "../type";
import { equalityFunctionEnum, OrientationType } from "../type";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ResponsiveContext = createContext<ScreemResponsiveStoreUnion>();
const ResponsiveContextProvider = ResponsiveContext.Provider;
const useResponsiveContextStore = ResponsiveContext.useStore;
const ResponsiveContextApi = ResponsiveContext.useStoreApi;
export { ResponsiveContextProvider, useResponsiveContextStore, ResponsiveContextApi };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AreEqualContext =
    createContext<Mutate<StoreApi<EqualityFunctionUnion>, [["zustand/subscribeWithSelector", never]]>>();
const AreEqualProvider = AreEqualContext.Provider;
const useAreEqualStore = AreEqualContext.useStore;
const AreEqualApi = AreEqualContext.useStoreApi;
export { AreEqualProvider, useAreEqualStore, AreEqualApi };
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

// export const ResponsiveContext =  React.createContext<ScreemResponsiveStoreUnion | null>(null);
// export const areEqualContext =  React.createContext<EqualityFunctionUnion | null>(null);
export interface ResponsiveProviderProps extends ViewProps {
    children?: React.ReactNode;
    option: ScreenUtilDesignSize;
    loading: boolean;
    autoInset: boolean;
}

export function ResponsiveProvider({ children, option, loading, autoInset }: ResponsiveProviderProps): JSX.Element {
    const storeRef = useRef<Mutate<StoreApi<ScreemResponsiveStoreUnion>, [["zustand/subscribeWithSelector", never]]>>(
        createScreenResponsiveStore()
    );
    if (!storeRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        storeRef.current = createScreenResponsiveStore();
    }
    const areEqualstoreRef = useRef<
        Mutate<StoreApi<EqualityFunctionUnion>, [["zustand/subscribeWithSelector", never]]>
    >(createEqualityFunctionStore());
    if (!areEqualstoreRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        areEqualstoreRef.current = createEqualityFunctionStore();
    }
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
    if (!option.equality) {
        option.equality = equalityFunctionEnum.shallow;
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => {
            const result = await storeRef.current.getState().setScreenResponsiveInitialize(option);
            if (result.error) {
                return;
            }
            if (autoInset && Platform.OS === "ios") {
                const orientation = storeRef.current.getState().getOrientation();
                if (orientation === OrientationType.POTTRAIT) {
                    setAutoInset(
                        StyleSheet.create<responsiveContainerStyle>({
                            responsiveContainer: {
                                flexGrow: 1,
                                top: ResponsiveStore._____getInset(orientation)
                            }
                        })
                    );
                }
                if (orientation === OrientationType.LANDSCAPE) {
                    setAutoInset(
                        StyleSheet.create<responsiveContainerStyle>({
                            responsiveContainer: {
                                flexGrow: 1,
                                left: ResponsiveStore._____getInset(orientation)
                            }
                        })
                    );
                }
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const unsubcribe2 = storeRef.current.subscribe(
            (state: screenResponsiveState) => state,
            (state) => {
                ResponsiveStore.getAction().copyData(state);
            },
            {
                equalityFn: (a, b) => getAreEqual[0](a, b),
                fireImmediately: true
            }
        );
        const unsubcribeEqual = areEqualstoreRef.current.subscribe(
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
        return () => {
            unsubcribe2();
            unsubcribeEqual();
        };
    }, []);

    const getSize = useCallback((event: LayoutChangeEvent) => {
        if (inRange(event.nativeEvent.layout.height, 0, 100)) {
            return;
        }
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        storeRef.current.getState().setScreenReScreeenSizeRatio(width, height);
    }, []);

    return (
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        <AreEqualProvider createStore={() => areEqualstoreRef.current}>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <View style={rootViewStyle.rootView} onLayout={getSize}>
                    <ResponsiveContextProvider
                        createStore={
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                            () => storeRef.current
                        }>
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
                    </ResponsiveContextProvider>
                </View>
            }
        </AreEqualProvider>
    );
}
