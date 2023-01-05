import type { FC } from "react";
import { getConditionResult } from "./getConditionResults";
import { render } from "./render";
import type { ComponentWithConditionPropsWithFunctionChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Then>
 *         { ... }
 *     </Then>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Then /`> block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
const WhenFn: FC<ComponentWithConditionPropsWithFunctionChildren> = ({ condition, children }) => {
    const conditionResult = Boolean(getConditionResult(condition));

    return conditionResult && children ? render({ children }) : null;
};

export const When = _memo(WhenFn, _shallowFn);

WhenFn.defaultProps = {
    children: null
};
