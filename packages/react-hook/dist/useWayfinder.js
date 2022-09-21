"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var wayfinder_lib_1 = tslib_1.__importStar(require("@talismn/wayfinder-lib"));
var wayfinderInstance = new wayfinder_lib_1.default();
var useWayfinder = function (props) {
    var _a = (0, react_1.useState)(wayfinder_lib_1.defaultWayfinderSubscriptionResult), wayfinderState = _a[0], setWayfinderState = _a[1];
    (0, react_1.useEffect)(function () {
        wayfinderInstance.configure(props);
    }, [props]);
    (0, react_1.useEffect)(function () {
        var unsub = wayfinderInstance.subscribe(setWayfinderState);
        return function () { return unsub(); };
    }, []);
    return tslib_1.__assign(tslib_1.__assign({}, wayfinderState), { set: function (key, val) { return wayfinderInstance.setFilter(key, val); }, clear: function () { return wayfinderInstance.reset(); } });
};
exports.default = useWayfinder;
