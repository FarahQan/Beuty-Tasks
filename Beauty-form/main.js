class UsersInStorage {
  #users;
  constructor() {
    this.#users = JSON.parse(localStorage.getItem("Users")) || [];
  }

  addToLocalStorage(data) {
    this.#users.push(data);
    localStorage.setItem("Users", JSON.stringify(this.#users));
    registerForm.hideForm();
    loginForm.showForm();
  }

  checkUserByEmail(email) {
    const isExist = this.#users.filter((el) => {
      return el.email === email;
    });
    return isExist;
  }

  isUserInStorage = (data) => {
    const checkUser = this.checkUserByEmail(data);
    if (checkUser.length) {
      return true;
    } else {
      return false;
    }
  };

  checkUserForLogin = (data) => {
    const isUserExist = this.checkUserByEmail(data.email);
    if (isUserExist.length) {
      if (isUserExist[0].password === data.password) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}

class PageUI {
  constructor() {
    const body = getDOMElement("body");
    const container = createUIElement("container", "div");
    const main = createUIElement("main", "main");

    body.appendChild(container);
    container.append(new Header().createHeader, main);
  }
}

class Header {
  #nav;
  #header;
  constructor() {
    const title = createUIElement("title", "h1", "", "Beauty Form");
    this.#header = createUIElement("header", "header");

    this.#header.appendChild(title);
    this.#createNavbar();
  }

  #createNavbar = () => {
    this.#nav = createUIElement("nav", "nav");
    const buttons = { Login: "login-btn", Register: "register-btn" };

    for (const key in buttons) {
      const navBtn = createUIElement(buttons[key], "button", "", key);

      navBtn.addEventListener("click", this.#handleForms);

      this.#nav.appendChild(navBtn);
    }
    this.#header.appendChild(this.#nav);
  };

  get createHeader() {
    return this.#header;
  }

  #handleForms = (e) => {
    if (e.target.innerText === "Register") {
      registerForm.showForm();
      loginForm.hideForm();
    } else {
      loginForm.showForm();
      registerForm.hideForm();
    }
  };
}

class Form {
  constructor(className, formName, addedMainClass, removedMainClass) {
    this.Form = createUIElement(className, "form");
    this.addedMainClass = addedMainClass;
    this.removedMainClass = removedMainClass;

    createFormHeader(this.Form, formName);

    this.formInputs = new FormInputs(this.Form);

    this.main = getDOMElement(".main");

    this.main.appendChild(this.Form);
  }

  clearFields = () => {};

  createFormBottom = () => {};

  hideForm = () => {
    this.Form.classList.add("hide-form");
  };

  showForm = () => {
    this.clearFields();
    this.main.classList.add(this.addedMainClass);
    this.main.classList.remove(this.removedMainClass);
    this.Form.classList.remove("hide-form");
  };
}

class LoginForm extends Form {
  constructor() {
    super("login-form", "Login", "login-form-area", "register-form-area");
    this.hideForm();
    this.formInputs.createLoginInputs();
    this.createFormBottom();
    this.Form.addEventListener("submit", this.submitForm);
  }
  createFormBottom = () => {
    const submitBtn = createUIElement(
      "form-btn",
      "button",
      "",
      "Login",
      "submit"
    );
    this.Form.appendChild(submitBtn);
  };

  submitForm(e) {
    e.preventDefault();
    validation.checkLoginUser();
  }
}

class RegisterForm extends Form {
  constructor() {
    super(
      "register-form",
      "Registration",
      "register-form-area",
      "login-form-area"
    );
    this.showForm();
    this.formInputs.createRegisterInputs();
    this.createFormBottom();
    this.Form.addEventListener("submit", this.submitForm);
  }

  clearFields = () => {
    const country = getDOMElement(".country-default-option");
    const gender = getDOMElement(".selected-gender");
    const inputsValues = getDOMElement(".form-input");
    const validationMessages = getDOMElement(".validation-message");
    const passwordValidationList = getDOMElement(".password-validation-list");
    const isInvalid = getDOMElement(".invalid");

    if (isInvalid) {
      isInvalid.classList.remove("invalid");
    }

    if (validationMessages.length > 1) {
      validationMessages.forEach((el) => {
        el.classList.add("hide-invalid-message");
        el.classList.remove("validation-message");
      });
    } else if (validationMessages !== false) {
      validationMessages.classList.add("hide-invalid-message");
      validationMessages.classList.remove("validation-message");
    }
    if (passwordValidationList !== false) {
      passwordValidationList.classList.remove("password-validation-list");
      passwordValidationList.classList.add("hide-validation-list");
    }
    if (country !== false) {
      country.classList.remove("selected");
      country.innerText = "Country";
    }
    if (gender !== false) {
      gender.checked = false;
      gender.classList.remove("selected-gender");
    }

    inputsValues &&
      inputsValues.forEach((el) => {
        el.value = "";
        el.classList.remove("valid-input");
        el.classList.remove("invalid-input");
      });
  };

  createFormBottom = () => {
    const submitBtn = createUIElement(
      "form-btn",
      "button",
      "",
      "Register",
      "submit"
    );

    const registerFormBottomWrapper = createUIElement(
      "register-form-bottom-wrapper",
      "div"
    );
    const terms = createUIElement(
      "",
      "img",
      "./assets/Terms and Conditions.png"
    );
    this.Form.appendChild(registerFormBottomWrapper);
    registerFormBottomWrapper.append(terms, submitBtn);
  };

  submitForm = (e) => {
    e.preventDefault();
    const country = getDOMElement(".country-default-option");
    const gender = getDOMElement(".selected-gender");
    const inputsValues = getDOMElement(".register-input");
    const isInvalid = getDOMElement(".invalid");

    if (!isInvalid) {
      const newUser = {
        email: "",
        username: "",
        password: "",
        country: "",
        gender: "",
      };

      newUser.gender = gender.value;
      newUser.country = country.innerText;

      inputsValues.forEach((el) => {
        if (el.placeholder === "Email") {
          newUser.email = el.value;
        }
        if (el.placeholder === "Password") {
          newUser.password = el.value;
        }
        if (el.placeholder === "User name") {
          newUser.username = el.value;
        }
        el.value = "";
        el.classList.remove("valid-input");
        el.classList.remove("invalid-input");
      });

      UsersStorage.addToLocalStorage(newUser);
      this.clearFields();
    }
  };
}

class Validation {
  #password;
  constructor() {
    this.#password = "";
  }

  #addInvalidInputClass = (input) => {
    input.classList.add("invalid-input");
    input.classList.remove("valid-input");
  };

  #addValidInputClass = (input) => {
    input.classList.remove("invalid-input");
    input.classList.add("valid-input");
  };

  #addInvalidMessageClass = (message) => {
    this.#invalidMessage(message);
    message.classList.add("validation-message");
    message.classList.remove("hide-invalid-message");
  };

  #addValidMessageClass = (message) => {
    message.classList.add("hide-invalid-message");
    this.#validMessage(message);
    message.classList.remove("validation-message");
    message.innerText = "";
  };

  checkRegistrationEmail = (input) => {
    const emailValidationMessage = getDOMElement(".email");
    const isUserInStorage = UsersStorage.isUserInStorage(input.value);
    const isValid = this.#checkInputValue(
      input,
      /^[\w\.-]+@[\w-]+\.[\w-]{2,3}/g
    );
    if (isUserInStorage || !isValid) {
      this.#addInvalidMessageClass(emailValidationMessage);
      this.#addInvalidInputClass(input);

      if (isUserInStorage) {
        emailValidationMessage.innerText = emailValidationMessages.exist;
      } else {
        emailValidationMessage.innerText = emailValidationMessages.invalid;
      }
      return;
    } else {
      this.#addValidMessageClass(emailValidationMessage);
      this.#addValidInputClass(input);
    }
  };

  checkUsername = (input) => {
    const usernameValidationMessage = getDOMElement(".username");
    let inputValue;
    let firstChar;
    if (input.value) {
      inputValue = this.#checkInputValue(input, /[A-Z]/g);
      firstChar = input.value[0].match(/[^A-Za-z]/g);
    }

    if (
      !input.value ||
      (inputValue && inputValue.length) ||
      (firstChar && firstChar.length)
    ) {
      this.#addInvalidInputClass(input);
      this.#addInvalidMessageClass(usernameValidationMessage);
      if (!input.value) {
        usernameValidationMessage.innerText =
          usernameValidationMessages.invalid;
      } else if (inputValue && inputValue.length) {
        usernameValidationMessage.innerText =
          usernameValidationMessages.smallLetter;
      } else {
        usernameValidationMessage.innerText =
          usernameValidationMessages.startChar;
      }
      return;
    } else {
      this.#addValidInputClass(input);
      this.#addValidMessageClass(usernameValidationMessage);
    }
  };

  checkRegistrationPassword = (input) => {
    const capitalCharItem = getDOMElement(".capitalChar");
    const passNumberItem = getDOMElement(".passNumber");
    const smallCharItem = getDOMElement(".smallChar");
    const specialCharItem = getDOMElement(".specialChar");
    const validationList =
      getDOMElement(".hide-validation-list") ||
      getDOMElement(".password-validation-list");

    if (!input.value) {
      validationList.classList.add("password-validation-list");
      validationList.classList.remove("hide-validation-list");
    }

    const checkCapital = this.#checkInputValue(input, /[A-Z]/g);
    const checkSmall = this.#checkInputValue(input, /[a-z]/g);
    const checkNumber = this.#checkInputValue(input, /[0-9]/g);
    const checkSpecial = this.#checkInputValue(input, /\W/g);

    if (!checkCapital || !checkSmall || !checkNumber || !checkSpecial) {
      this.#addInvalidInputClass(input);
      if (!checkCapital) {
        this.#invalidMessage(capitalCharItem);
      }
      if (!checkSmall) {
        this.#invalidMessage(smallCharItem);
      }
      if (!checkNumber) {
        this.#invalidMessage(passNumberItem);
      }
      if (!checkSpecial) {
        this.#invalidMessage(specialCharItem);
      }
    }

    if (checkCapital) {
      this.#validMessage(capitalCharItem);
    }

    if (checkSmall) {
      this.#validMessage(smallCharItem);
    }

    if (checkNumber) {
      this.#validMessage(passNumberItem);
    }
    if (checkSpecial) {
      this.#validMessage(specialCharItem);
    }

    if (checkCapital && checkSmall && checkNumber && checkSpecial) {
      this.#addValidInputClass(input);
    }
    this.#password = input.value;
  };

  checkPassword2 = (input) => {
    const password2ValidationMessage = getDOMElement(".password2");

    if (!input.value || input.value !== this.#password) {
      this.#addInvalidInputClass(input);
      this.#addInvalidMessageClass(password2ValidationMessage);
      if (!input.value) {
        password2ValidationMessage.innerText =
          password2ValidationMessages.invalid;
      } else {
        password2ValidationMessage.innerText =
          password2ValidationMessages.notMatch;
      }
      return;
    } else {
      this.#addValidInputClass(input);
      this.#addValidMessageClass(password2ValidationMessage);
    }
  };

  #checkInputValue = (input, regex) => {
    const isChecked = input.value.match(regex);
    return isChecked;
  };

  checkLoginUser = () => {
    const loginValidationMessage = getDOMElement(".login-validation-message");
    const loginInputs = getDOMElement(".login-input");
    const loginInfo = { email: "", password: "" };
    loginInputs.forEach((el) => {
      if (el.type === "email") {
        loginInfo.email = el.value;
      } else {
        loginInfo.password = el.value;
      }
    });
    loginValidationMessage.classList.remove("hide-invalid-message");
    loginValidationMessage.classList.add("validation-message");
    if (!UsersStorage.checkUserForLogin(loginInfo)) {
      loginValidationMessage.innerText = loginValidationMessages.invalid;
      this.#invalidMessage(loginValidationMessage);
      return false;
    } else {
      this.#validMessage(loginValidationMessage);
      loginValidationMessage.innerText = loginValidationMessages.valid;
      return true;
    }
  };

  #invalidMessage = (message) => {
    message.classList.add("invalid");
    message.classList.remove("valid");
  };

  #validMessage = (message) => {
    message.classList.remove("invalid");
    message.classList.add("valid");
  };
}

const UsersStorage = new UsersInStorage();
const validation = new Validation();
const pageUI = new PageUI();
const registerForm = new RegisterForm();
const loginForm = new LoginForm();
