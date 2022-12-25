import inRange from "lodash/inRange";
import isNaN from "lodash/isNaN";
import isNull from "lodash/isNull";
import isNumber from "lodash/isNumber";
import isUndefined from "lodash/isUndefined";
import reduce from "lodash/reduce";
import values from "lodash/values";
import round from "lodash/round";

function isValueNumber(value: any): boolean {
    if(isUndefined(value)) {
        return false;
    }
    if(isNull(value)) {
        return false;
    }
    if(!isNumber(value)) {
        return false;
    }
    if(isNaN(value)) {
        return false;
    }
    return true;
}
export {
    isValueNumber,
    reduce,
    inRange,
    values,
    round
};