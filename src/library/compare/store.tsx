import { deepEqual, shallowEqual } from "fast-equals";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import qcompare from "qcompare";
import type { StoreApi } from "zustand";
import { createStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import shallow from "zustand/shallow";
import type { Mutate } from "zustand/vanilla";
import { equalityFunctionEnum } from "../../type";
import type { equalityFunctionAction, equalityFunctionStore } from "../../type";

export type EqualityFunctionUnion = equalityFunctionStore & equalityFunctionAction;
export type EqualityFunctionStore = ReturnType<typeof createEqualityFunctionStore>;
export function createEqualityFunctionStore(): Mutate<
    StoreApi<EqualityFunctionUnion>,
    [["zustand/subscribeWithSelector", never]]
> {
    return createStore<EqualityFunctionUnion>()(
        subscribeWithSelector(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (set, get, store) => ({
                type: equalityFunctionEnum.shallow,
                areEqual: shallow,
                GetEqualityFunction(): Function {
                    return get().areEqual;
                },
                GetEqualityStatus(): [Function, equalityFunctionEnum] {
                    const currentState = get();
                    return [currentState.areEqual, currentState.type];
                },
                SetEqualityFunction(type: equalityFunctionEnum): void {
                    set({ type: type });
                    switch (type) {
                        case equalityFunctionEnum.fasteEqualsDeep:
                            set({ areEqual: shallowEqual });
                            break;
                        case equalityFunctionEnum.fasteEqualsShallow:
                            set({ areEqual: deepEqual });
                            break;
                        case equalityFunctionEnum.shallow:
                            set({ areEqual: shallow });
                            break;
                        case equalityFunctionEnum.qcompare:
                            set({ areEqual: qcompare });
                            break;
                        default:
                            set({ areEqual: Object.is });
                            break;
                    }
                }
            })
        )
    );
}
