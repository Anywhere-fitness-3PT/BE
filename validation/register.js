const Validator = require("validator")
const ifEmpty = require("./checkForEmpty")

module.exports = function checkRegistrationFields(data) {
    // An errors object is created
    let errors = {};

    // If data.email is not empty, data.email = data.email
    // else if empty, data.email = ""
    data.email = !ifEmpty(data.email) ? data.email : "";
    data.password1 = !ifEmpty(data.password1) ? data.password1 : "",
    data.password2 = !ifEmpty(data.password2) ? data.password2: "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email address is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email address in invalid";
    }
    if (Validator.isEmpty(data.password1)) {
        errors.password1 = "Password is required";
    }
    if (!Validator.isLength(data.password1, { min: 8, max: 120 })) {
        errors.password1 = "Password must be greater than 8 charachters";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password confirmation is required";
    }
    if (!Validator.equals(data.password1, data.password2)) {
        errors.password2 = "Password fields must match";
    }

    // Return the errors from the CheckRegistrationFields function
    // and use the ifEmpty function to check if the errors object is empty

    return {
        errors,
        isValid: ifEmpty(errors)
    }
}
