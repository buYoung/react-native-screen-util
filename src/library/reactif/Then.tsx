import { render } from "./render";
import type { FCWithImplicitChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */
const ThenFn: FCWithImplicitChildren = (props) => render(props);
export const Then = _memo(ThenFn, _shallowFn);
