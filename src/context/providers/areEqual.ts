import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import type { EqualityFunctionStore } from "../../library";

const AreEqualContext = createContext<EqualityFunctionStore | null>(null);
function useAreEqualStore<T>(
    selector: (state: EqualityFunctionStore) => T,
    equalityFn?: (left: T, right: T) => boolean
): T {
    const store = useContext(AreEqualContext);
    if (!store) throw new Error("Missing ScreenResponsiveStoreContext.Provider in the tree");
    if (!equalityFn) {
        equalityFn = shallow;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return useStore(store, selector, equalityFn);
}

export const AreEqualProvider = AreEqualContext.Provider;
export { useAreEqualStore };
