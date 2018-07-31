var default_1 = (function () {
    function default_1() {
    }
    default_1.satisfies = function (password, minLen, requireUpperCase, requireLowerCase, requireNumbers, requireSpecial) {
        if (minLen === void 0) { minLen = 8; }
        if (requireUpperCase === void 0) { requireUpperCase = true; }
        if (requireLowerCase === void 0) { requireLowerCase = true; }
        if (requireNumbers === void 0) { requireNumbers = true; }
        if (requireSpecial === void 0) { requireSpecial = true; }
        if (!password) {
            return false;
        }
        if (password.length < (+minLen || 8)) {
            return false;
        }
        var hasUpperCase = /[A-Z]/.test(password) || !requireUpperCase;
        var hasLowerCase = /[a-z]/.test(password) || !requireLowerCase;
        var hasNumbers = /\d/.test(password) || !requireNumbers;
        var hasNonAlphas = /\W/.test(password) || !requireSpecial;
        return +hasUpperCase + +hasLowerCase + +hasNumbers + +hasNonAlphas === 4;
    };
    return default_1;
}());
export default default_1;
//# sourceMappingURL=PasswordUtil.js.map