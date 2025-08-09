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
exports.projectionHistoricalData = exports.projectionCalculation = exports.multiplyCalculation = exports.growthCalculation = exports.addCalculation = void 0;
var addCalculation = function (_a) {
    var param1 = _a.param1, param2 = _a.param2;
    return param1 + param2;
};
exports.addCalculation = addCalculation;
var growthCalculation = function (_a) {
    var param1 = _a.param1, param2 = _a.param2;
    return param1 - param2 / 100;
};
exports.growthCalculation = growthCalculation;
var multiplyCalculation = function (_a) {
    var param1 = _a.param1, param2 = _a.param2;
    return param1 * param2;
};
exports.multiplyCalculation = multiplyCalculation;
var projectionCalculation = function (_a) {
    var param1 = _a.param1, param2 = _a.param2;
    return param1 * (1 + param2 / 100);
};
exports.projectionCalculation = projectionCalculation;
var projectionHistoricalData = function (data, growth, finalYear, initialYear) {
    if (initialYear === void 0) { initialYear = 2020; }
    var arrayHasil = __spreadArray([], data, true);
    var time = initialYear + arrayHasil.length;
    while (time <= finalYear) {
        var lastValue = arrayHasil[arrayHasil.length - 1];
        var nextValue = (0, exports.projectionCalculation)({
            param1: lastValue,
            param2: growth,
        });
        console.log(time, nextValue);
        arrayHasil.push(nextValue);
        time += 1;
    }
    return arrayHasil;
};
exports.projectionHistoricalData = projectionHistoricalData;
var datas = [100, 200, 300, 400, 500];
var testing = (0, exports.projectionHistoricalData)(datas, 0.5, 2030);
