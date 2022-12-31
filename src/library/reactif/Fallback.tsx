import { render } from "./render";
import type { FCWithImplicitChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block whose condition prop is a promise.
 * @param props The props to pass down to the `<Fallback />` component
 */
const FallbackFn: FCWithImplicitChildren = (props) => render(props);

export const Fallback: FCWithImplicitChildren = _memo(FallbackFn, _shallowFn);
