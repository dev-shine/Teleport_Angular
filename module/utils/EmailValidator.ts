
export namespace EmailValidator {

    const EMAIL_TESTER = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    /**
     * Checks if the email is valid.
     * Swiped from: https://github.com/Sembiance/email-validator
     * @param email
     * @returns {boolean}
     */
    export function isValid (email: string): boolean {

        if (! email) { return false; }

        if (email.length > 254) { return false; }

        let valid = EMAIL_TESTER.test(email);
        if (! valid) { return false; }

        // Further checking of some things regex can't handle
        let parts = email.split("@");
        if (parts[0].length > 64) { return false; }

        let domainParts = parts[1].split(".");
        return ! domainParts.some(part => part.length > 63);
    }
}
