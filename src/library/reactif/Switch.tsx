import type { ReactElement } from "react";
import React from "react";
import { Case } from "./Case";
import { Default } from "./Default";
import { getConditionResult } from "./getConditionResults";
import { isFunction } from "./isThenable";
import type { FCWithImplicitChildren } from "./types";
import { _memo, _shallowFn } from "./utils";

/**
 * It will render the first matching `<Case />`, or the first encountered `<Default />` (or `null`).
 *
 * This component can contain any number of `<Case />` and one `<Default />` blocks
 * @param __namedParameters Children to pass into the `<Switch />` component
 */
const SwitchFn: FCWithImplicitChildren = ({ children }) => {
    // -- Inspired by react-router --

    // We use React.Children.forEach instead of React.Children.toArray().find()
    // here because toArray adds keys to all child elements and we do not want
    // to trigger an unmount/remount for two children <Case>s or <Default>s
    let matchingCase: ReactElement | undefined;
    let defaultCase: ReactElement | undefined;

    // If the children are a function then resolve it first
    if(isFunction(children)) {
        children = children();
    }

    React.Children.forEach(children, (child) => {
        // not a valid react child, don't add it
        /* istanbul ignore next - This is only a safe fail for people writing bad code */
        if(!React.isValidElement(child)) {
            return;
        }

        if(!matchingCase && child.type === Case) {
            const { condition } = child.props;

            const conditionResult = getConditionResult(condition);

            if(conditionResult) {
                matchingCase = child;
            } // else not matching condition, don't add it
        } else if(!defaultCase && child.type === Default) {
            defaultCase = child;
        } // else unknown type, don't add it
    });

    return matchingCase ?? defaultCase ?? null;
};

export const Switch = _memo(SwitchFn, _shallowFn);