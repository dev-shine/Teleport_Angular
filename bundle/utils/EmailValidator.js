export var EmailValidator;
(function (EmailValidator) {
    var EMAIL_TESTER = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    function isValid(email) {
        if (!email) {
            return false;
        }
        if (email.length > 254) {
            return false;
        }
        var valid = EMAIL_TESTER.test(email);
        if (!valid) {
            return false;
        }
        var parts = email.split("@");
        if (parts[0].length > 64) {
            return false;
        }
        var domainParts = parts[1].split(".");
        return !domainParts.some(function (part) { return part.length > 63; });
    }
    EmailValidator.isValid = isValid;
})(EmailValidator || (EmailValidator = {}));
//# sourceMappingURL=EmailValidator.js.map