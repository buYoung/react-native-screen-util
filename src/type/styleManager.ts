import type { NamedStyles } from "../responsive";
import type { responsiveAllowListCircle } from "../responsive";

export type typeManager = {
    id: number;
    size: number;
    styleed: Record<string, any>;
    unStyled: Record<string, any>;
};
export type styleManagerState = {
    style?: typeManager[];
    currentSize?: number;
};
export type styleManagerAction = {
    create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T;
    _styleParse<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T;
    isCircle(checkCircle: typeof responsiveAllowListCircle): boolean;
    isSameDimension(checkCircle: typeof responsiveAllowListCircle): boolean;
};
export type StyleManagerUnion = styleManagerAction & styleManagerState;
