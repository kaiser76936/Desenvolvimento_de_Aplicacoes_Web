"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
exports.validator = {
    isEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isPositiveNumber: (num) => {
        return num > 0;
    }
};
