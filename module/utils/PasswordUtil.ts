

export default class {

    public static satisfies (password: string, minLen = 8, requireUpperCase = true, requireLowerCase = true, requireNumbers = true, requireSpecial = true) {

        if (! password) { return false; }

        if (password.length < (+minLen || 8)) { return false; }

        let hasUpperCase = /[A-Z]/.test(password) || !requireUpperCase;
        let hasLowerCase = /[a-z]/.test(password) || !requireLowerCase;
        let hasNumbers   = /\d/.test(password)    || !requireNumbers;
        let hasNonAlphas = /\W/.test(password)    || !requireSpecial;

        return +hasUpperCase + +hasLowerCase + +hasNumbers + +hasNonAlphas === 4;
    }
}
