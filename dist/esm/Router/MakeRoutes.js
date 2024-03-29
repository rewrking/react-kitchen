var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { BrowserRouter, Navigate, useNavigate, useLocation, useParams, useMatch, useRoutes } from "react-router-dom";
var makeRoutes = function (inRoutes, HomeComponent, NotFoundComponent, routerOptions) {
    if (HomeComponent === void 0) { HomeComponent = null; }
    if (NotFoundComponent === void 0) { NotFoundComponent = null; }
    if (routerOptions === void 0) { routerOptions = {}; }
    if (!!HomeComponent) {
        inRoutes.push({
            path: "/",
            element: React.createElement(HomeComponent, null),
        });
    }
    if (!!NotFoundComponent) {
        inRoutes.push({
            path: "*",
            element: React.createElement(NotFoundComponent, null),
        });
    }
    else {
        inRoutes.push({
            path: "*",
            redirectTo: "/",
        });
    }
    var outRoutes = inRoutes.map(function (_a) {
        var redirectTo = _a.redirectTo, route = __rest(_a, ["redirectTo"]);
        if (!!redirectTo) {
            return __assign(__assign({}, route), { element: React.createElement(Navigate, { to: redirectTo, replace: true }) });
        }
        return route;
    });
    var Routes = React.memo(function () {
        var element = useRoutes(outRoutes, routerOptions.baseName);
        return element;
    });
    return React.memo(function () { return (React.createElement(BrowserRouter, null,
        React.createElement(Routes, null))); });
};
export { makeRoutes, Navigate, useNavigate, useLocation, useParams, useMatch };
//# sourceMappingURL=MakeRoutes.js.map