const countries = ["Japan", "Jordan", "Spain", "UAE", "USA"];

const emailValidationMessages = {
  exist: "Email already exist",
  invalid: "Enter a valid email",
};

const genders = [
  createInputs(
    "",
    "",
    "gender-selector",
    "",
    false,
    "radio",
    "male",
    "male",
    "gender-selector-label",
    "Male",
    "gender",
    "Male"
  ),
  createInputs(
    "",
    "",
    "gender-selector",
    "",
    false,
    "radio",
    "female",
    "female",
    "gender-selector-label",
    "Female",
    "gender",
    "Female"
  ),
];
const loginInputs = [
  createInputs("email-icon", "email", "login-input", "Email", true, "email"),
  createInputs(
    "password-icon",
    "password",
    "login-input",
    "Password",
    true,
    "password"
  ),
];
const loginValidationMessages = {
  invalid: "Check email or password",
  valid: "Valid login credentials",
};
const passwordValidationMessages = {
  capitalChar: "Password Should contain Capital character",
  smallChar: "Password Should contain small character",
  specialChar: "Password Should contain special character",
  passNumber: "Password Should contain one number at least",
};
const password2ValidationMessages = {
  notMatch: "Password and password 2 didn't match",
  invalid: "Enter password 2",
};

const registerInputs = [
  createInputs("email-icon", "email", "register-input", "Email", true, "email"),
  createInputs(
    "username-icon",
    "username",
    "register-input",
    "User name",
    true,
    "text"
  ),
  createInputs(
    "password-icon",
    "password",
    "register-input",
    "Password",
    true,
    "password"
  ),
  createInputs(
    "password-icon",
    "password2",
    "register-input",
    "Password 2",
    true,
    "password"
  ),
];

const usernameValidationMessages = {
  smallLetter: "Username should be small letter",
  startChar: "username should start with character",
  invalid: "Enter a valid username",
};
