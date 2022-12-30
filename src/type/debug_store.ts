export interface debugScreenResponsiveAction {
    getDebugStatus(): boolean,
    startDebugResponsive(): void,
    stopDebugResponsive(): void
}
export interface debugScreenResponsiveState {
    debug: boolean
}