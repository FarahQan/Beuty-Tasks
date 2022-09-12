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

const createUIElement = ({
  classList,
  element,
  src = "",
  text = "",
  type = "",
}) => {
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

const createFormHeader = ({ element, text }) => {
  elementCreationObject = {
    classList: "form-title",
    element: "h5",
    text,
  };
  const title = createUIElement(elementCreationObject);
  elementCreationObject = {
    classList: "separator",
    element: "div",
  };
  const separator = createUIElement(elementCreationObject);
  element.append(title, separator);
};

const createPasswordValidationMessages = (list) => {
  for (const key in passwordValidationMessages) {
    elementCreationObject = {
      classList: key,
      element: "li",
      text: passwordValidationMessages[key],
    };
    const passwordValidItem = createUIElement(elementCreationObject);

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
      elementCreationObject = { classList: "field-wrapper", element: "div" };
      const fieldWrapper = createUIElement(elementCreationObject);

      elementCreationObject = {
        classList: el.inputClass,
        element: "input",
        type: el.type,
      };
      const input = createUIElement(elementCreationObject);

      elementCreationObject = { classList: el.iconClass, element: "div" };
      const inputIcon = createUIElement(elementCreationObject);

      elementCreationObject = { classList: "input-wrapper", element: "div" };
      const inputWrapper = createUIElement(elementCreationObject);

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
        elementCreationObject = {
          classList: "hide-validation-list",
          element: "ul",
        };
        const passwordValidationRules = createUIElement(elementCreationObject);
        passwordValidationRules.classList.add("hide-validation-list");
        createPasswordValidationMessages(passwordValidationRules);
        fieldWrapper.appendChild(passwordValidationRules);
        input.addEventListener("input", () => {
          passwordValidationRules.classList.remove("hide-validation-list");
          passwordValidationRules.classList.add("password-validation-list");
          validation.checkRegistrationPassword(input);
        });
      } else {
        elementCreationObject = { classList: el.input, element: "p" };
        const validationItem = createUIElement(elementCreationObject);
        validationItem.classList.add("hide-invalid-message");
        fieldWrapper.appendChild(validationItem);
      }
    });
    this.#createCountryChoices();
  };

  #createCountryChoices = () => {
    elementCreationObject = {
      classList: "options-wrapper",
      element: "div",
    };
    const optionsWrapper = createUIElement(elementCreationObject);

    elementCreationObject = {
      classList: "country-selector",
      element: "div",
    };
    const countrySelector = createUIElement(elementCreationObject);

    elementCreationObject = {
      classList: "gender-wrapper",
      element: "img",
      src: "./assets/Screen Shot 2022-09-01 at 1.16 1.png",
    };

    const countrySelectorArrow = createUIElement(elementCreationObject);

    elementCreationObject = {
      classList: "country-default-option",
      element: "div",
      text: "Country",
    };

    const countrySelectorOption = createUIElement(elementCreationObject);

    elementCreationObject = {
      classList: "country-selector-wrapper",
      element: "div",
    };
    const countrySelectorWrapper = createUIElement(elementCreationObject);

    this.#form.appendChild(countrySelectorWrapper);
    countrySelector.append(countrySelectorOption, countrySelectorArrow);
    countrySelectorWrapper.append(countrySelector, optionsWrapper);
    countries.forEach((el) => {
      elementCreationObject = { classList: "option", element: "p", text: el };

      const country = createUIElement(elementCreationObject);

      country.addEventListener("click", this.#selectCountry);
      optionsWrapper.appendChild(country);

      countrySelector.addEventListener("click", this.#toggleOptionsWrapper);
    });
    this.#createGenderChoices();
  };

  #createGenderChoices = () => {
    elementCreationObject = { classList: "gender-wrapper", element: "div" };

    const genderWrapper = createUIElement(elementCreationObject);
    genders.forEach((el) => {
      elementCreationObject = {
        classList: el.inputClass,
        element: "input",
        type: el.type,
      };

      const genderSelector = createUIElement(elementCreationObject);

      elementCreationObject = {
        classList: el.labelClass,
        element: "label",
        text: el.labelText,
      };
      const genderSelectorLabel = createUIElement(elementCreationObject);

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
    elementCreationObject = {
      classList: "login-validation-message",
      element: "p",
    };
    const validationItem = createUIElement(elementCreationObject);
    validationItem.classList.add("hide-invalid-message");

    loginInputs.forEach((el) => {
      elementCreationObject = {
        classList: "field-wrapper",
        element: "div",
      };
      const fieldWrapper = createUIElement(elementCreationObject);

      elementCreationObject = {
        classList: el.inputClass,
        element: "input",
        type: el.type,
      };
      const input = createUIElement(elementCreationObject);

      elementCreationObject = {
        classList: el.iconClass,
        element: "div",
      };
      const inputIcon = createUIElement(elementCreationObject);

      elementCreationObject = {
        classList: "input-wrapper",
        element: "div",
      };
      const inputWrapper = createUIElement(elementCreationObject);

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
