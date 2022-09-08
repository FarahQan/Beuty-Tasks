const createInputs = (
  iconClass,
  input,
  inputClass,
  placeholder,
  required,
  type,
  htmlFor = "",
  id = "",
  labelClass = "",
  labelText = "",
  name = "",
  value = ""
) => {
  return {
    iconClass,
    input,
    inputClass,
    placeholder,
    required,
    type,
    htmlFor,
    id,
    labelClass,
    labelText,
    name,
    value,
  };
};

const createUIElement = (classList, element, src = "", text = "", type = "") => {
  const createdItem = document.createElement(element);
  if (classList) {
    createdItem.classList.add(classList);
  }
  if (text) {
    createdItem.innerText = text;
  }
  if (type) {
    createdItem.type = type;
  }
  if (src) {
    createdItem.src = src;
  }
  return createdItem;
};

const createFormHeader = (form, formTitle) => {
  const title = createUIElement("form-title", "h5", "", formTitle);
  const separator = createUIElement("separator", "div");
  form.append(title, separator);
};

const createPasswordValidationMessages = (list) => {
  for (const key in passwordValidationMessages) {
    const passwordValidItem = createUIElement(
      key,
      "li",
      "",
      passwordValidationMessages[key]
    );

    passwordValidItem.classList.add("password-validation-list-item");
    list.appendChild(passwordValidItem);
  }
};

class FormInputs {
  #form;
  constructor(form) {
    this.#form = form;
  }

  createRegisterInputs = () => {
    registerInputs.forEach((el) => {
      const fieldWrapper = createUIElement("field-wrapper", "div");
      const input = createUIElement(el.inputClass, "input", "", "", el.type);
      const inputIcon = createUIElement(el.iconClass, "div");
      const inputWrapper = createUIElement("input-wrapper", "div");

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

      input.classList.add("form-input");
      inputIcon.classList.add("input-icon");
      input.placeholder = el.placeholder;
      input.required = el.required;

      this.#form.appendChild(fieldWrapper);
      inputWrapper.append(inputIcon, input);
      fieldWrapper.appendChild(inputWrapper);

      if (el.placeholder === "Password") {
        const passwordValidationRules = createUIElement(
          "hide-validation-list",
          "ul"
        );
        passwordValidationRules.classList.add("hide-validation-list");
        createPasswordValidationMessages(passwordValidationRules);
        fieldWrapper.appendChild(passwordValidationRules);
        input.addEventListener("input", () => {
          passwordValidationRules.classList.remove("hide-validation-list");
          passwordValidationRules.classList.add("password-validation-list");
          validation.checkRegistrationPassword(input);
        });
      } else {
        const validationItem = createUIElement(el.input, "p");
        validationItem.classList.add("hide-invalid-message");
        fieldWrapper.appendChild(validationItem);
      }
    });
    this.#createCountryChoices();
  };

  #createCountryChoices = () => {
    const optionsWrapper = createUIElement("options-wrapper", "div");
    const countrySelector = createUIElement("country-selector", "div");
    const countrySelectorArrow = createUIElement(
      "gender-wrapper",
      "img",
      "./assets/Screen Shot 2022-09-01 at 1.16 1.png"
    );
    const countrySelectorOption = createUIElement(
      "country-default-option",
      "div",
      "",
      "Country"
    );
    const countrySelectorWrapper = createUIElement(
      "country-selector-wrapper",
      "div"
    );
    this.#form.appendChild(countrySelectorWrapper);
    countrySelector.append(countrySelectorOption, countrySelectorArrow);
    countrySelectorWrapper.append(countrySelector, optionsWrapper);
    countries.forEach((el) => {
      const country = createUIElement("option", "p", "", el);

      country.addEventListener("click", this.#selectCountry);
      optionsWrapper.appendChild(country);

      countrySelector.addEventListener("click", this.#toggleOptionsWrapper);
    });
    this.#createGenderChoices();
  };

  #createGenderChoices = () => {
    const genderWrapper = createUIElement("gender-wrapper", "div");
    genders.forEach((el) => {
      const genderSelector = createUIElement(
        el.inputClass,
        "input",
        "",
        "",
        el.type
      );

      const genderSelectorLabel = createUIElement(
        el.labelClass,
        "label",
        "",
        el.labelText
      );

      genderSelector.id = el.id;
      genderSelector.name = el.name;
      genderSelector.value = el.value;
      genderSelectorLabel.htmlFor = el.htmlFor;

      genderSelector.addEventListener("click", this.#selectGender);
      genderWrapper.append(genderSelector, genderSelectorLabel);
    });
    this.#form.appendChild(genderWrapper);
  };

  #toggleOptionsWrapper() {
    const optionsWrapper = getDOMElement(".options-wrapper");
    optionsWrapper.classList.toggle("show-options-wrapper");
  }

  #selectCountry(e) {
    const countrySelectorOption = getDOMElement(".country-default-option");
    const optionsWrapper = getDOMElement(".options-wrapper");
    countrySelectorOption.classList.add("selected");
    countrySelectorOption.innerText = e.target.innerText;
    optionsWrapper.classList.remove("show-options-wrapper");
  }

  #selectGender(e) {
    const isSelected = getDOMElement(".gender-selector");
    isSelected.forEach((el) => {
      if (el.classList.contains("selected-gender")) {
        el.classList.remove("selected-gender");
      }
    });

    e.target.classList.add("selected-gender");
  }

  createLoginInputs() {
    const validationItem = createUIElement("login-validation-message", "p");
    validationItem.classList.add("hide-invalid-message");

    loginInputs.forEach((el) => {
      const fieldWrapper = createUIElement("field-wrapper", "div");
      const input = createUIElement(el.inputClass, "input", "", "", el.type);
      const inputIcon = createUIElement(el.iconClass, "div");
      const inputWrapper = createUIElement("input-wrapper", "div");

      input.classList.add("form-input");
      inputIcon.classList.add("input-icon");

      input.placeholder = el.placeholder;

      this.#form.appendChild(fieldWrapper);
      inputWrapper.append(inputIcon, input);
      fieldWrapper.appendChild(inputWrapper);
    });

    this.#form.appendChild(validationItem);
  }
}

const getDOMElement = (element) => {
  const result = document.querySelectorAll(element);
  if (!result.length) {
    return false;
  }

  if (result.length > 1) {
    return result;
  } else {
    return result[0];
  }
};
