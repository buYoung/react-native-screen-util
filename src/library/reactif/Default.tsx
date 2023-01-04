import { render } from "./render";
import type { FCWithImplicitChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */
export const DefaultFn: FCWithImplicitChildren = (props) => render(props);

DefaultFn.defaultProps = {
    children: null
};

export const Default: FCWithImplicitChildren = _memo(DefaultFn, _shallowFn);
