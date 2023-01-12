import inRange from "lodash/inRange";
import React, { useCallback, useEffect, useRef } from "react";
import type { LayoutChangeEvent, ViewStyle } from "react-native";
import { ActivityIndicator, InteractionManager, Platform, StyleSheet, View } from "react-native";
import shallow from "zustand/shallow";
import { loadingStyleSheet } from "./loading";
import { AreEqualProvider, ResponsiveProvider } from "./providers";
import type { ResponsiveStore } from "./store";
import { createScreenResponsiveStore } from "./store";
import type { EqualityFunctionStore } from "../library";
import { createEqualityFunctionStore, Fallback, If, round, Then } from "../library";
import { onViewSizeChangeEvent } from "../library/event/bus";
import { ResponsiveStore as ResponsivePrivateStore } from "../responsive";
import type { equalityFunctionStore, ResponsiveState, ScreenUtilDesignSize } from "../type";
import { equalityFunctionEnum, OrientationType } from "../type";

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
type ScreenResponsiveProviderProps = React.PropsWithChildren<ScreenResponsiveProvider>;

export function ScreenResponsiveProvider({
    children,
    option,
    loading,
    autoInset
}: ScreenResponsiveProviderProps): JSX.Element {
    const areEqualRef = useRef<[Function, equalityFunctionEnum]>([shallow, equalityFunctionEnum.shallow]);

    const rootViewRef = useRef<View>(null);
    const storeRef = useRef<ResponsiveStore>();

    const areEqualStoreRef = useRef<EqualityFunctionStore>();
    if (!storeRef.current) {
        storeRef.current = createScreenResponsiveStore();
    }

    if (!areEqualStoreRef.current) {
        areEqualStoreRef.current = createEqualityFunctionStore();
    }

    if (!option.equality) {
        option.equality = equalityFunctionEnum.shallow;
    }

    useEffect(() => {
        let unSubcribeResponsive: () => void;
        let unSubcribeAreEqual: () => void;

        onViewSizeChangeEvent.on("onChangeInsideEvent", () => {
            const view = rootViewRef.current;
            if (!view) {
                return;
            }

            if (autoInset && Platform.OS === "ios") {
                const orientation = ResponsivePrivateStore.getAction().getOrientation();
                if (orientation === OrientationType.POTTRAIT) {
                    view.setNativeProps({ top: ResponsivePrivateStore._____getInset(orientation) });
                }
                if (orientation === OrientationType.LANDSCAPE) {
                    view.setNativeProps({ left: ResponsivePrivateStore._____getInset(orientation) });
                }
            }
        });

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

            unSubcribeResponsive = responsiveRefCurrent.subscribe(
                (state: ResponsiveState) => state,
                (next, _prev) => {
                    ResponsivePrivateStore.getAction().copyData(next);
                },
                {
                    equalityFn: (a, b) => areEqualRef.current[0](a, b),
                    fireImmediately: true
                }
            );

            unSubcribeAreEqual = areEqualRefCurrent.subscribe(
                (state: equalityFunctionStore) => state,
                (next, _prev) => {
                    if (next.type === areEqualRef.current[1]) {
                        return;
                    }
                    areEqualRef.current = [next.areEqual, next.type];
                },
                {
                    equalityFn: (a, b) => areEqualRef.current[0](a, b)
                }
            );
        });

        return () => {
            unSubcribeResponsive();

            unSubcribeAreEqual();

            onViewSizeChangeEvent.removeAllListeners("onChangeInsideEvent");
        };
    }, []);

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => {
            await ResponsivePrivateStore.getAction().getInitialize();

            onViewSizeChangeEvent.emit("onChangeInsideEvent");
        });
    }, []);

    const getSize = useCallback((event: LayoutChangeEvent) => {
        if (!storeRef.current) {
            return;
        }

        if (inRange(event.nativeEvent.layout.height, 0, 100)) {
            return;
        }

        const width = round(event.nativeEvent.layout.width);
        const height = round(event.nativeEvent.layout.height);

        storeRef.current.getState().setScreenReScreeenSizeRatio(width, height);
    }, []);
    return (
        <AreEqualProvider value={areEqualStoreRef.current}>
            <View ref={rootViewRef} style={rootViewStyle.rootView} onLayout={getSize}>
                <ResponsiveProvider value={storeRef.current}>
                    <If condition={loading}>
                        <Then>
                            <If condition={ResponsivePrivateStore.getAction().getInitialize()} keepAlive={true}>
                                <Fallback>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        <ActivityIndicator style={loadingStyleSheet.loading} />
                                    }
                                </Fallback>
                                <Then>
                                    {(): any => {
                                        return children;
                                    }}
                                </Then>
                            </If>
                        </Then>
                    </If>
                    <If condition={!loading}>
                        <Then>{children}</Then>
                    </If>
                </ResponsiveProvider>
            </View>
        </AreEqualProvider>
    );
}
