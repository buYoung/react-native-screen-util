import React, {useEffect, useRef, useState } from "react";
import type { ViewProps } from "react-native";
import { ActivityIndicator } from "react-native";
import type { Mutate } from "zustand";
import createContext from "zustand/context";
import shallow from "zustand/shallow";
import type { StoreApi } from "zustand/vanilla";
import { loadingStyleSheet } from "./loading";
import type { ScreemResponsiveStoreUnion } from "./store";
import { createScreenResponsiveStore } from "./store";
import { createEqualityFunctionStore } from "../library";
import { Else, Fallback, If, Then } from "../library";
import type { EqualityFunctionUnion } from "../library";
import type { ScreenUtilDesignSize, screenResponsiveState, equalityFunctionStore } from "../type";
import { equalityFunctionEnum } from "../type";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const { ResponsiveContext, useResponsiveApi} =
                 createContext<Mutate<StoreApi<ScreemResponsiveStoreUnion>, [ [ "zustand/subscribeWithSelector", never ] ]>>();


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const { AreEqualContext, useAreEqualApi } =
                 createContext<Mutate<StoreApi<EqualityFunctionUnion>, [ [ "zustand/subscribeWithSelector", never ] ]>>();



// export const ResponsiveContext =  React.createContext<ScreemResponsiveStoreUnion | null>(null);
// export const areEqualContext =  React.createContext<EqualityFunctionUnion | null>(null);
export interface ResponsiveProviderProps extends ViewProps {
    children?: React.ReactNode;
    option: ScreenUtilDesignSize;
    loading: boolean;
}
export function ResponsiveProvider({ children, option, loading }: ResponsiveProviderProps): JSX.Element {
    const storeRef = useRef<Mutate<StoreApi<ScreemResponsiveStoreUnion>, [ [ "zustand/subscribeWithSelector", never ] ]>>(createScreenResponsiveStore());
    if(!storeRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        storeRef.current = createScreenResponsiveStore();
    }
    const areEqualstoreRef = useRef<Mutate<StoreApi<EqualityFunctionUnion>, [ [ "zustand/subscribeWithSelector", never ] ]>>(createEqualityFunctionStore());
    if(! areEqualstoreRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        areEqualstoreRef.current = createEqualityFunctionStore();
    }
    const [ getAreEqual, setAreEqual ] = useState<[Function, equalityFunctionEnum]>([ shallow, equalityFunctionEnum.shallow ]);
    if(!option.equality) {
        option.equality = equalityFunctionEnum.shallow;
    }

    // const equlityStore = useAreEqualContext((state) => state, (left, right) => {
    //     return getAreEqual[0](left, right);
    // });
    //
    // const store = useResponsiveApi((state) => state, (left, right) => {
    //     return getAreEqual[0](left, right);
    // } );
    useEffect(() => {
        const unsubcribe = storeRef.current.subscribe(
            (state) => [ state.safeAreaInset, state.scaleWidth, state.scaleHeight, state.font ],
            (next, _prev) => {
                console.log(next);
            }, {
                equalityFn : (a, b) => getAreEqual[0](a, b)
            });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const unsubcribe2 = storeRef.current.subscribe((state:screenResponsiveState) => state, null, {
            equalityFn     : (a, b) => getAreEqual[0](a, b),
            fireImmediately: true

        });

        const unsubcribeEqual = areEqualstoreRef.current.subscribe(
            (state:equalityFunctionStore) => state, (next, _prev) => {
                if(next.type === getAreEqual[1]) {
                    return;
                }
                setAreEqual([ next.areEqual, next.type ]);

            }, {
                equalityFn : (a, b) => getAreEqual[0](a, b)
            });


        return () => {
            unsubcribe();
            unsubcribe2();
            unsubcribeEqual();
        };
    }, [ ]);


    useEffect(() => {

    }, [storeRef.current.getState().safeAreaInset]);



    return (
        <AreEqualContext value={areEqualstoreRef.current}>
            <ResponsiveContext value={storeRef.current}>
                <If condition={loading && storeRef.current.getState().getInitialize()} keepAlive={true}>
                    <Fallback>
                        <ActivityIndicator style={loadingStyleSheet.loading}/>
                    </Fallback>
                    <Then>
                        {(returnValue, promiseHistory): any => {
                            console.log("if test", returnValue, promiseHistory);
                            return (children);
                        }}
                    </Then>
                    <Else>
                        { children }
                    </Else>
                </If>
            </ResponsiveContext>
        </AreEqualContext>
    );
}

//
// export function useResponsiveContext<T>(
//     selector: (state: ScreemResponsiveStoreUnion) => T,
//     equalityFn?: (left: T, right: T) => boolean
// ): T {
//     const store = useContext(ResponsiveContext);
//     if(!store) throw new Error("Missing ScreenResponsiveStoreContext.Provider in the tree");
//     if(!equalityFn) {
//         equalityFn = shallow;
//     }
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//
//
//     return useRespContext(store, selector, equalityFn);
// }
// export function useAreEqualContext<T>(
//     selector: (state: EqualityFunctionUnion) => T,
//     equalityFn?: (left: T, right: T) => boolean
// ): T {
//     const store = useContext(areEqualContext);
//     if(!store) throw new Error("Missing ScreenResponsiveStoreContext.Provider in the tree");
//     if(!equalityFn) {
//         equalityFn = shallow;
//     }
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     return useStore(store, selector, equalityFn);
// }