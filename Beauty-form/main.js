class UsersInStorage {
  #users;
  constructor() {
    this.#users = JSON.parse(localStorage.getItem("Users")) || [];
  }

  addToLocalStorage(data) {
    this.#users.push(data);
    localStorage.setItem("Users", JSON.stringify(this.#users));
    registerForm.hideRegisterForm();
    loginForm.showLoginForm();
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

const UsersStorage = new UsersInStorage();

class PageUI {
  #nav;
  constructor() {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const header = document.createElement("header");
    const main = document.createElement("main");
    const title = document.createElement("h1");
    this.#nav = document.createElement("nav");

    main.classList.add("main");

    title.innerText = "Beauty Form";

    container.classList.add("container");
    header.classList.add("header");
    this.#nav.classList.add("nav");
    title.classList.add("title");

    this.#createNavbar();

    body.appendChild(container);
    container.appendChild(header);
    container.appendChild(main);
    header.appendChild(title);
    header.appendChild(this.#nav);
  }

  #createNavbar = () => {
    const buttons = { Login: "login-btn", Register: "register-btn" };

    for (const key in buttons) {
      const navBtn = document.createElement("button");
      navBtn.innerText = key;
      navBtn.classList.add(buttons[key]);

      navBtn.addEventListener("click", this.#handleForms);

      this.#nav.appendChild(navBtn);
    }
  };

  #handleForms = (e) => {
    if (e.target.innerText === "Register") {
      registerForm.showRegisterForm();
      loginForm.hideLoginForm();
    } else {
      loginForm.showLoginForm();
      registerForm.hideRegisterForm();
    }
  };
}

class LoginForm {
  #loginForm;
  #main;
  constructor() {
    this.#loginForm = document.createElement("form");

    const submitBtn = document.createElement("button");
    this.#createLoginFormHeader();
    this.#main = document.querySelector(".main");

    submitBtn.innerText = "Login";

    submitBtn.classList.add("form-btn");
    this.#loginForm.classList.add("hide-form");
    this.#loginForm.classList.add("login-form");
    submitBtn.type = "submit";

    this.#main.appendChild(this.#loginForm);
    this.#createLoginInputs();

    this.#loginForm.appendChild(submitBtn);

    this.#loginForm.addEventListener("submit", this.#submitLogin);
  }
  #createLoginFormHeader = () => {
    formHeader.forEach((el) => {
      const headerItem = document.createElement(el.item);
      if (el.item === "h5") {
        headerItem.innerText = "Login";
      }
      headerItem.classList.add(el.class);
      this.#loginForm.appendChild(headerItem);
    });
  };

  #createLoginInputs() {
    const validationItem = document.createElement("p");

    validationItem.classList.add("login-validation-message");
    validationItem.classList.add("hide-invalid-message");

    loginInputs.forEach((el) => {
      const fieldWrapper = document.createElement("div");
      const inputIcon = document.createElement("div");
      const input = document.createElement("input");
      const inputWrapper = document.createElement("div");

      fieldWrapper.classList.add("field-wrapper");
      input.classList.add("form-input");
      input.classList.add(el.inputClass);
      inputIcon.classList.add("input-icon");
      inputIcon.classList.add(el.iconClass);
      inputWrapper.classList.add("input-wrapper");

      input.placeholder = el.placeholder;
      input.type = el.type;

      this.#loginForm.appendChild(fieldWrapper);
      inputWrapper.appendChild(inputIcon);
      inputWrapper.appendChild(input);
      fieldWrapper.appendChild(inputWrapper);
    });

    this.#loginForm.appendChild(validationItem);
  }

  showLoginForm = () => {
    this.#main.classList.add("login-form-area");
    this.#main.classList.remove("register-form-area");
    this.#loginForm.classList.remove("hide-form");
  };

  hideLoginForm = () => {
    this.#loginForm.classList.add("hide-form");
  };

  #submitLogin(e) {
    e.preventDefault();
    validation.checkLoginUser();
  }
}

class RegisterForm {
  #main;
  #registerForm;
  #countrySelector;
  #countrySelectorArrow;
  #countrySelectorOption;
  #countrySelectorWrapper;
  #optionsWrapper;
  #genderWrapper;
  constructor() {
    this.#registerForm = document.createElement("form");
    const RegisterFormBottomWrapper = document.createElement("div");
    const submitBtn = document.createElement("button");
    const terms = document.createElement("img");
    this.#countrySelector = document.createElement("div");
    this.#countrySelectorArrow = document.createElement("img");
    this.#countrySelectorOption = document.createElement("div");
    this.#countrySelectorWrapper = document.createElement("div");
    this.#createRegisterFormHeader();
    this.#genderWrapper = document.createElement("div");
    this.#main = document.querySelector(".main");
    this.#optionsWrapper = document.createElement("div");

    terms.src = "./assets/Terms and Conditions.png";
    submitBtn.innerText = "Register";

    RegisterFormBottomWrapper.classList.add("register-form-bottom-wrapper");
    submitBtn.classList.add("form-btn");
    this.#countrySelector.classList.add("country-selector");
    this.#countrySelectorOption.classList.add("country-default-option");
    this.#countrySelectorWrapper.classList.add("country-selector-wrapper");
    this.#genderWrapper.classList.add("gender-wrapper");
    this.#main.classList.add("register-form-area");
    this.#main.classList.remove("login-form-area");
    this.#optionsWrapper.classList.add("options-wrapper");
    this.#registerForm.classList.add("register-form");

    submitBtn.type = "submit";

    this.#registerForm.addEventListener("submit", this.#submitForm);

    this.#main.appendChild(this.#registerForm);
    this.#createRegisterInputs();

    this.#countrySelectorOption.innerText = "Country";
    this.#countrySelectorArrow.src =
      "./assets/Screen Shot 2022-09-01 at 1.16 1.png";

    this.#createCountryChoices();

    this.#createGenderChoices();

    this.#registerForm.appendChild(this.#genderWrapper);
    this.#registerForm.appendChild(RegisterFormBottomWrapper);
    RegisterFormBottomWrapper.appendChild(terms);
    RegisterFormBottomWrapper.appendChild(submitBtn);
  }

  #createRegisterFormHeader = () => {
    formHeader.forEach((el) => {
      const headerItem = document.createElement(el.item);
      if (el.item === "h5") {
        headerItem.innerText = "Registration";
      }
      headerItem.classList.add(el.class);
      this.#registerForm.appendChild(headerItem);
    });
  };

  #createRegisterInputs = () => {
    registerInputs.forEach((el) => {
      const fieldWrapper = document.createElement("div");
      const inputIcon = document.createElement("div");
      const input = document.createElement("input");

      input.addEventListener("blur", () => {
        if (input.placeholder === "Email") {
          validation.checkRegistrationEmail(input);
        }
        if (input.placeholder === "User name") {
          validation.checkUsername(input);
        }
        if (input.placeholder === "Password") {
          validation.checkRegistrationPassword(input);
        }

        if (input.placeholder === "Password 2") {
          validation.checkPassword2(input);
        }
      });

      const inputWrapper = document.createElement("div");

      input.classList.add(el.inputClass);
      input.classList.add("form-input");
      fieldWrapper.classList.add("field-wrapper");
      inputIcon.classList.add("input-icon");
      inputIcon.classList.add(el.iconClass);
      inputWrapper.classList.add("input-wrapper");

      input.placeholder = el.placeholder;
      input.required = el.required;
      input.type = el.type;

      this.#registerForm.appendChild(fieldWrapper);
      inputWrapper.appendChild(inputIcon);
      inputWrapper.appendChild(input);
      fieldWrapper.appendChild(inputWrapper);

      if (el.placeholder === "Password") {
        const passwordValidationRules = document.createElement("ul");
        passwordValidationRules.classList.add("hide-validation-list");
        validation.createPasswordValidationMessages(passwordValidationRules);
        fieldWrapper.appendChild(passwordValidationRules);
        input.addEventListener("input", () => {
          passwordValidationRules.classList.remove("hide-validation-list");
          passwordValidationRules.classList.add("password-validation-list");
          validation.checkRegistrationPassword(input);
        });
      } else {
        const validationItem = document.createElement("p");
        validationItem.classList.add(el.input);
        validationItem.classList.add("hide-invalid-message");
        fieldWrapper.appendChild(validationItem);
      }
    });
  };

  #createCountryChoices = () => {
    this.#registerForm.appendChild(this.#countrySelectorWrapper);
    this.#countrySelectorWrapper.appendChild(this.#countrySelector);
    this.#countrySelector.appendChild(this.#countrySelectorOption);
    this.#countrySelector.appendChild(this.#countrySelectorArrow);
    this.#countrySelectorWrapper.appendChild(this.#optionsWrapper);
    countries.forEach((el) => {
      const country = document.createElement("p");
      country.classList.add("option");
      country.innerText = el;
      country.addEventListener("click", this.#selectCountry);
      this.#optionsWrapper.appendChild(country);

      this.#countrySelector.addEventListener(
        "click",
        this.#toggleOptionsWrapper
      );
    });
  };

  #createGenderChoices = () => {
    genders.forEach((el) => {
      const genderSelector = document.createElement("input");
      const genderSelectorLabel = document.createElement("label");

      genderSelector.classList.add(el.class);
      genderSelector.id = el.id;
      genderSelector.name = el.name;
      genderSelector.type = el.type;
      genderSelector.value = el.value;
      genderSelectorLabel.classList.add(el.labelClass);
      genderSelectorLabel.htmlFor = el.for;
      genderSelectorLabel.innerText = el.labelText;

      genderSelector.addEventListener("click", this.#selectGender);

      this.#genderWrapper.appendChild(genderSelector);
      this.#genderWrapper.appendChild(genderSelectorLabel);
    });
  };

  #clearFields = () => {
    const country = document.querySelector(".country-default-option");
    const gender = document.querySelector(".selected-gender");
    const inputsValues = document.querySelectorAll(".form-input");
    const validationMessages = document.querySelectorAll(".validation-message");
    const passwordValidationList = document.querySelector(
      ".password-validation-list"
    );
    if (validationMessages.length) {
      validationMessages.forEach((el) => {
        el.classList.add("hide-invalid-message");
        el.classList.remove("validation-message");
      });
    }
    if (passwordValidationList !== null) {
      passwordValidationList.classList.remove("password-validation-list");
      passwordValidationList.classList.add("hide-validation-list");
    }
    country.classList.remove("selected");
    country.innerText = "Country";
    if (gender !== null) {
      gender.checked = false;
      gender.classList.remove("selected-gender");
    }
    inputsValues.forEach((el) => {
      el.value = "";
      el.classList.remove("valid-input");
      el.classList.remove("invalid-input");
    });
  };

  #toggleOptionsWrapper() {
    const optionsWrapper = document.querySelector(".options-wrapper");
    optionsWrapper.classList.toggle("show-options-wrapper");
  }

  #selectCountry(e) {
    const countrySelectorOption = document.querySelector(
      ".country-default-option"
    );
    const optionsWrapper = document.querySelector(".options-wrapper");
    countrySelectorOption.classList.add("selected");
    countrySelectorOption.innerText = e.target.innerText;
    optionsWrapper.classList.remove("show-options-wrapper");
  }
  #selectGender(e) {
    const isSelected = document.querySelector(".gender-selector");
    if (isSelected.classList.contains("selected-gender")) {
      isSelected.classList.remove("selected-gender");
    }
    e.target.classList.add("selected-gender");
  }
  showRegisterForm = () => {
    this.#clearFields();
    this.#main.classList.add("register-form-area");
    this.#main.classList.remove("login-form-area");
    this.#registerForm.classList.remove("hide-form");
  };

  hideRegisterForm = () => {
    this.#registerForm.classList.add("hide-form");
  };

  #submitForm(e) {
    e.preventDefault();
    const country = document.querySelector(".country-default-option");
    const gender = document.querySelector(".selected-gender");
    const inputsValues = document.querySelectorAll(".register-input");
    const isInvalid = document.querySelectorAll(".invalid");
    if (!isInvalid.length) {
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
      this.#clearFields();
    }
  }
}

class Validation {
  #password;
  constructor() {
    this.#password = "";
  }

  createPasswordValidationMessages(data) {
    for (const key in passwordValidationMessages) {
      const passwordValidItem = document.createElement("li");
      passwordValidItem.innerText = passwordValidationMessages[key];

      passwordValidItem.classList.add("password-validation-list-item");
      passwordValidItem.classList.add(key);
      data.appendChild(passwordValidItem);
    }
  }
  checkRegistrationEmail = (input) => {
    const emailValidationMessage = document.querySelector(".email");
    const isUserInStorage = UsersStorage.isUserInStorage(input.value);
    if (
      isUserInStorage ||
      !input.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    ) {
      this.#addInvalidMessageClass(emailValidationMessage);
      if (isUserInStorage) {
        emailValidationMessage.innerText = emailValidationMessages.exist;
      } else {
        emailValidationMessage.innerText = emailValidationMessages.invalid;
      }
      this.#addInvalidInputClass(input);
      return;
    } else {
      this.#addValidMessageClass(emailValidationMessage);
      this.#addValidInputClass(input);
    }
  };

  checkUsername = (input) => {
    const usernameValidationMessage = document.querySelector(".username");
    let inputValue;
    let firstChar;
    if (input.value) {
      inputValue = input.value.match(/[A-Z]/g);
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
    const capitalCharItem = document.querySelector(".capitalChar");
    const passNumberItem = document.querySelector(".passNumber");
    const smallCharItem = document.querySelector(".smallChar");
    const specialCharItem = document.querySelector(".specialChar");
    const validationList =
      document.querySelector(".hide-validation-list") ||
      document.querySelector(".password-validation-list");

    if (!input.value) {
      validationList.classList.add("password-validation-list");
      validationList.classList.remove("hide-validation-list");
    }

    const checkCapital = input.value.match(/[A-Z]/g);
    const checkSmall = input.value.match(/[a-z]/g);
    const checkNumber = input.value.match(/[0-9]/g);
    const checkSpecial = input.value.match(/\W/g);

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
    const password2ValidationMessage = document.querySelector(".password2");

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

  checkLoginUser = () => {
    const loginValidationMessage = document.querySelector(
      ".login-validation-message"
    );
    const loginInputs = document.querySelectorAll(".login-input");
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

  #invalidMessage = (message) => {
    message.classList.add("invalid");
    message.classList.remove("valid");
  };

  #validMessage = (message) => {
    message.classList.remove("invalid");
    message.classList.add("valid");
  };
}
const validation = new Validation();
const pageUI = new PageUI();
const registerForm = new RegisterForm();
const loginForm = new LoginForm();
