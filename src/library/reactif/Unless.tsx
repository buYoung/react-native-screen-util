import type { FC } from "react";
import { getConditionResult } from "./getConditionResults";
import { render } from "./render";
import type { ComponentWithConditionPropsWithFunctionChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Else>
 *         { ... }
 *     </Else>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Else />` block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
export const UnlessFn: FC<ComponentWithConditionPropsWithFunctionChildren> = ({ condition, children }) => {
    const conditionResult = Boolean(getConditionResult(condition));

    return !conditionResult && children ? render({ children }) : null;
};

UnlessFn.defaultProps = {
    children: null
};

export const Unless = _memo(UnlessFn, _shallowFn);
