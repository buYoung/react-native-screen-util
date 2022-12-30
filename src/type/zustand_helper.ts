import { Mutate, StoreApi } from "zustand/esm/vanilla";

type SetStateInternal<T> = {
    _(partial: T | Partial<T> | {
        _(state: T): T | Partial<T>;
    }["_"], replace?: boolean | undefined): void;
}["_"];
export interface StoreApiCustom<T> {
    setState: SetStateInternal<T>;
    getState: () => T;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
}

export type CustomZustandSubscribeHelper<T> = Mutate<StoreApi<T>, [[ "zustand/subscribeWithSelector", never ]]>;