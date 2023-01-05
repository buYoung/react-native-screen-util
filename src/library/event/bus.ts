import EventEmitter2 from "eventemitter2";

export const onViewSizeChangeEvent = new EventEmitter2({
    wildcard: true,
    delimiter: "onViewLoading",
    newListener: true,
    maxListeners: 1000,
    removeListener: true,
    verboseMemoryLeak: true
});
