"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxInput = void 0;
var react_1 = __importDefault(require("react"));
var formik_1 = require("formik");
var CheckboxInput = function (_a) {
    var disabled = _a.disabled, label = _a.label, className = _a.className, props = __rest(_a, ["disabled", "label", "className"]);
    var field = formik_1.useField(props.name)[0];
    var groupName = props.groupName ? props.groupName + "[]" : field.name;
    return (react_1.default.createElement("label", { htmlFor: field.name, className: "input-checkbox " + (className || "") },
        react_1.default.createElement("input", __assign({}, field, { id: field.name, value: field.name, type: "checkbox", name: groupName, disabled: disabled || false, onChange: function (ev) {
                return field.onChange(__assign(__assign({}, ev), { target: {
                        name: ev.target.value,
                        value: ev.target.checked,
                        groupName: ev.target.name
                    } }));
            } })),
        react_1.default.createElement("span", { className: "checkmark" }),
        react_1.default.createElement("span", { className: "padded-label" }, label)));
};
exports.CheckboxInput = CheckboxInput;
//# sourceMappingURL=CheckboxInput.js.map