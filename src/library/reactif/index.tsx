import React from "react";
import { If as RIf,  Case as RCase, Then as RThen,
         Default as RDefault, Switch as RSwitch, Else as RElse,
         When as Rwhen, Unless as RUnless, Fallback as RFallback
} from "react-if";
import shallow from "zustand/shallow";

const If = React.memo(RIf, shallow);
const Then = React.memo(RThen, shallow);
const Else = React.memo(RElse, shallow);
const Switch = React.memo(RSwitch, shallow);
const When = React.memo(Rwhen, shallow);
const Case = React.memo(RCase, shallow);
const Unless = React.memo(RUnless, shallow);
const Fallback = React.memo(RFallback, shallow);
const Default = React.memo(RDefault, shallow);


export {
    If,
    Then,
    Else,
    Switch,
    When,
    Case,
    Unless,
    Fallback,
    Default
};