import { render } from "./render";
import type { FCWithImplicitChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * Must only contain a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Else />` component
 */
const ElseFn: FCWithImplicitChildren = (props) => render(props);

export const Else: FCWithImplicitChildren = _memo(ElseFn, _shallowFn);
