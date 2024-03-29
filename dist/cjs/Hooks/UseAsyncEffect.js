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
exports.asyncEffectCache = exports.useAsyncEffect = void 0;
var react_1 = require("react");
var Utils_1 = require("../Utils");
var cache = {};
var logCache = function () {
    console.log(cache);
};
var clearEntriesById = function (ids) {
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        if (!!cache[id])
            delete cache[id];
    }
};
var clearEntries = function (entries) {
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        entry.remove();
    }
};
var clearAllEntries = function () {
    cache = {};
};
function useAsyncEffect(asyncFunc, deps) {
    var _a = (0, react_1.useState)(null), result = _a[0], setResult = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(-1), lastHash = _d[0], setLastHash = _d[1];
    // eslint-disable-next-line
    var memoizedFunction = (0, react_1.useMemo)(function () { return asyncFunc; }, deps);
    var hash = (0, react_1.useMemo)(function () {
        var toHash = memoizedFunction.toString() + deps.toString();
        var ret = (0, Utils_1.hashString)(toHash);
        setLastHash(ret);
        return ret;
        // eslint-disable-next-line
    }, __spreadArray([memoizedFunction], deps, true));
    var removeCacheEntry = (0, react_1.useMemo)(function () {
        return function () {
            if (!!cache[lastHash])
                delete cache[lastHash];
        };
    }, [lastHash]);
    (0, react_1.useEffect)(function () {
        var cancelRequest = false;
        if (hash !== lastHash) {
            removeCacheEntry();
        }
        if (!!cache[lastHash] && !!result) {
            setLoading(false);
            setError(null);
        }
        else {
            memoizedFunction()
                .then(function (res) {
                if (cancelRequest)
                    return;
                cache[hash] = res;
                setResult(res);
                setLoading(false);
                setError(null);
            })
                .catch(function (err) {
                if (cancelRequest)
                    return;
                setResult(null);
                setLoading(false);
                if (err.message) {
                    setError(err.message);
                }
                else {
                    setError(err.toString());
                }
            });
        }
        return function () {
            cancelRequest = true;
        };
    }, [hash, lastHash, memoizedFunction, removeCacheEntry]);
    return [result, loading, error, { id: hash, remove: removeCacheEntry }];
}
exports.useAsyncEffect = useAsyncEffect;
var asyncEffectCache = {
    log: logCache,
    clearEntries: clearEntries,
    clearEntriesById: clearEntriesById,
    clearAllEntries: clearAllEntries,
};
exports.asyncEffectCache = asyncEffectCache;
//# sourceMappingURL=UseAsyncEffect.js.map