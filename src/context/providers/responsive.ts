import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import type { ResponsiveStore } from "../store";

const ResponsiveContext = createContext<ResponsiveStore | null>(null);
function useResponsiveStore<T>(
    selector: (state: ResponsiveStore) => T,
    equalityFn?: (left: T, right: T) => boolean
): T {
    const store = useContext(ResponsiveContext);
    if (!store) throw new Error("Missing ScreenResponsiveStoreContext.Provider in the tree");
    if (!equalityFn) {
        equalityFn = shallow;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return useStore(store, selector, equalityFn);
}

export const ResponsiveProvider = ResponsiveContext.Provider;
export { useResponsiveStore };
