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
        console.log(0);
        return false;
    }
    if(isNull(value)) {
        console.log(1);
        return false;
    }
    if(!isNumber(value)) {
        console.log(2);
        return false;
    }
    if(isNaN(value)) {
        console.log(3);
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