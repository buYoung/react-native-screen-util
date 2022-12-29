import type { ScreenUtilDesignSizeDefault } from "./screen_util";

export interface screenResponsiveState extends ScreenUtilDesignSizeDefault {
    screenUtilInitialize: boolean,
    orientation: boolean,
}