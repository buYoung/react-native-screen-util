import type { ScreenUtilDesignSizeDefault } from "./screen_util";

export interface screenResponsiveState extends ScreenUtilDesignSizeDefault {
    screenUtilInitialize: boolean;
    orientation: boolean;
}

export interface screenResponsiveStatePrivate extends ScreenUtilDesignSizeDefault {
    screenUtilInitialize: boolean;
    orientation: boolean;
    oldSize: screenResponsiveSizeMatter;
    nextSize: screenResponsiveSizeMatter;
}

export interface screenResponsiveSizeMatter {
    width: number,
    height: number
}