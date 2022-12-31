import type { FC } from "react";
import { render } from "./render";
import type { ComponentWithConditionPropsWithFunctionChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */
export const CaseFn: FC<ComponentWithConditionPropsWithFunctionChildren> = (props) => render(props);

CaseFn.defaultProps = {
    children : null
};
export const Case: FC<ComponentWithConditionPropsWithFunctionChildren> = _memo(CaseFn, _shallowFn);
