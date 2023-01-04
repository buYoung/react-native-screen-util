export const enum equalityFunctionEnum {
    none,
    shallow,
    fasteEqualsShallow,
    fasteEqualsDeep,
    qcompare
}

export type equalityFunctionType = {
    areEqual<T>(prev: T, next: T): boolean;
};

export type equalityFunctionStore = {
    type: equalityFunctionEnum;
    areEqual: Function;
};

export type equalityFunctionAction = {
    GetEqualityFunction: () => Function;
    GetEqualityStatus: () => [Function, equalityFunctionEnum];
    SetEqualityFunction: (type: equalityFunctionEnum) => void;
};
