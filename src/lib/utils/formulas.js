"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.growthArrayCalculation = exports.growthCalculation = exports.computationArrays = exports.TYPE_COMPUTATION_ARRAY = exports.adjustTimeFrame = exports.projectionHistoricalData = exports.projectionCalculation = void 0;
var projectionCalculation = function (_a) {
    var before = _a.before, growth = _a.growth;
    return Math.round(before * (1 + growth / 100) * 100) / 100;
};
exports.projectionCalculation = projectionCalculation;
var projectionHistoricalData = function (_a) {
    var data = _a.data, growth = _a.growth, finalYear = _a.finalYear, _b = _a.initialYear, initialYear = _b === void 0 ? 2010 : _b;
    var result = __spreadArray([], data, true);
    var time = initialYear + result.length;
    while (time <= finalYear) {
        var lastValue = result[result.length - 1];
        var nextValue = (0, exports.projectionCalculation)({
            before: lastValue,
            growth: growth,
        });
        console.log(time, nextValue);
        result.push(nextValue);
        time += 1;
    }
    return result;
};
exports.projectionHistoricalData = projectionHistoricalData;
var adjustTimeFrame = function (_a) {
    var dataYear = _a.dataYear, finalYear = _a.finalYear, _b = _a.initialYear, initialYear = _b === void 0 ? 2010 : _b;
    var result = __spreadArray([], dataYear, true);
    while (result.length <= finalYear - initialYear) {
        var lastValue = result[result.length - 1];
        var nextValue = lastValue + 1;
        result.push(nextValue);
    }
    return result;
};
exports.adjustTimeFrame = adjustTimeFrame;
exports.TYPE_COMPUTATION_ARRAY = {
    ADD: "ADD",
    MULTIPLY: "MULTIPLY",
};
var computationArrays = function (type) {
    var arrays = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arrays[_i - 1] = arguments[_i];
    }
    if (arrays.length === 0)
        return [];
    var length = arrays[0].length;
    if (!arrays.every(function (arr) { return arr.length === length; })) {
        throw new Error("All arrays must have the same length");
    }
    var result = new Array(length).fill(type === exports.TYPE_COMPUTATION_ARRAY.MULTIPLY ? 1 : 0);
    for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
        var arr = arrays_1[_a];
        for (var i = 0; i < length; i++) {
            switch (type) {
                case exports.TYPE_COMPUTATION_ARRAY.ADD:
                    result[i] += arr[i];
                    break;
                case exports.TYPE_COMPUTATION_ARRAY.MULTIPLY:
                    result[i] *= arr[i];
                    break;
                default:
                    throw new Error("Invalid computation type");
            }
        }
    }
    return result.map(function (num) { return Math.round(num * 100) / 100; });
};
exports.computationArrays = computationArrays;
var growthCalculation = function (_a) {
    var before = _a.before, current = _a.current;
    if (!before || !current)
        return 0;
    if (before && current) {
        return current / before - 1;
    }
    return 0;
};
exports.growthCalculation = growthCalculation;
var testArray = [
    1116670, 1130132, 1142884, 1154982, 1166478, 1177310, 1187274, 1196692,
    1205186, 1213004, 1228842.577, 1244887.963, 1261142.859, 1277610,
];
var growthArrayCalculation = function (array) {
    var result = [0];
    var newArray = array.map(function (item) { return (item === null ? 0 : item); });
    console.log(newArray);
    for (var i = 1; i < newArray.length; i++) {
        var growth_i = (0, exports.growthCalculation)({
            before: newArray[i - 1],
            current: newArray[i],
        });
        console.log(growth_i);
        result.push(growth_i);
    }
    console.log(result);
    return result;
};
exports.growthArrayCalculation = growthArrayCalculation;
(0, exports.growthArrayCalculation)(testArray);
