import type { ScreenUtilDesignSizeDefault } from "./screen_util";

export interface ResponsiveState extends ScreenUtilDesignSizeDefault {
    screenUtilInitialize: boolean;
    orientation: boolean;
}

export interface ResponsiveStatePrivate extends ScreenUtilDesignSizeDefault {
    screenUtilInitialize: boolean;
    orientation: boolean;
    oldSize: ResponsiveSizeMatter;
    nextSize: ResponsiveSizeMatter;
}

export interface ResponsiveSizeMatter {
    width: number;
    height: number;
}
