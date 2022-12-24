import { _scaleSize } from "./screen_util";

export function marginPadding(value: number): number {

    return Math.round(Math.min(_scaleSize.height, _scaleSize.width) * value);
}