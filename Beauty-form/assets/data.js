const formHeader = [
  {
    item: "h5",
    class: "form-title",
  },
  {
    item: "div",
    class: "separator",
  },
];

const registerInputs = [
  {
    input: "email",
    type: "email",
    placeholder: "Email",
    iconClass: "email-icon",
    inputClass: "register-input",
    required: true,
  },
  {
    input: "username",
    type: "text",
    placeholder: "User name",
    iconClass: "username-icon",
    inputClass: "register-input",
    required: true,
  },
  {
    input: "password",
    type: "password",
    placeholder: "Password",
    iconClass: "password-icon",
    inputClass: "register-input",
    required: true,
  },
  {
    input: "password2",
    type: "password",
    placeholder: "Password 2",
    iconClass: "password-icon",
    inputClass: "register-input",
    required: true,
  },
];

const loginInputs = [
  {
    input: "email",
    type: "email",
    placeholder: "Email",
    iconClass: "email-icon",
    inputClass: "login-input",
  },
  {
    input: "password",
    type: "password",
    placeholder: "Password",
    iconClass: "password-icon",
    inputClass: "login-input",
  },
];

const genders = [
  {
    id: "male",
    name: "gender",
    type: "radio",
    value: "Male",
    class: "gender-selector",
    labelClass: "gender-selector-label",
    for: "male",
    labelText: "Male",
  },
  {
    id: "female",
    name: "gender",
    type: "radio",
    value: "Female",
    class: "gender-selector",
    labelClass: "gender-selector-label",
    for: "female",
    labelText: "Female",
  },
];

const countries = ["Jordan", "USA", "UAE", "Japan", "Spain"];

const emailValidationMessages = {
  exist: "Email already exist",
  invalid: "Enter a valid email",
};

const usernameValidationMessages = {
  smallLetter: "Username should be small letter",
  startChar: "username should start with character",
  invalid: "Enter a valid username",
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

const loginValidationMessages = {
  invalid: "Check email or password",
  valid: "Valid login credentials",
};
