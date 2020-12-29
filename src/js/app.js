import "../scss/app.scss";

// import {
//   isEmpty,
//   isEmailValid,
//   isPasswordSecure,
//   isBetween,
//   isSame
// } from './utils/simpleValide.js';
// import {
//   errorTemplate,
//   successTemplate,
//   successRestoreTemplate,
//   showError,
//   Success
// } from './utils/messages.js';
import CheckFieldName from "./checkFields/checkFieldName.js";
import CheckFieldEmail from "./checkFields/checkFieldEmail.js";
import CheckFieldPassword from "./checkFields/checkFieldPassword.js";
import CheckFieldPasswordConfirm from "./checkFields/checkFieldPasswordConfirm.js";
import CheckConfirm from "./checkFields/checkConfirm.js";
import { debounce } from "./utils/helpers.js";

document.addEventListener("DOMContentLoaded", function () {
  formSignUpData();
});

class FormValidation {
  constructor(form) {
    this._form = form;
    this._elements = this._form.elements;
    this._name = this._elements.name || "";
    this._email = this._elements.email || "";
    this._password = this._elements.password || "";
    this._passwordConfirm = this._elements.passwordConfirm || "";
    this._confirm = this._elements.confirm || "";
  }
  checkName() {
    let checkName = new CheckFieldName(this._name);
    checkName.Required();
    return checkName.valid;
  }
  checkEmail() {
    let checkEmail = new CheckFieldEmail(this._email);
    checkEmail.Required();
    return checkEmail.valid;
  }
  checkPassword() {
    let checkPassword = new CheckFieldPassword(this._password);
    checkPassword.Required();
    return checkPassword.valid;
  }
  checkPasswordConfirm() {
    let checkPasswordConfirm = new CheckFieldPasswordConfirm(
      this._passwordConfirm,
      this._password
    );
    checkPasswordConfirm.Required();
    return checkPasswordConfirm.valid;
  }
  checkConfirm() {
    let checkConfirm = new CheckConfirm(this._confirm);
    checkConfirm.Required();
    return checkConfirm.valid;
  }
}

function formOnInputCheck(form) {
  form.addEventListener(
    "input",
    debounce(function (evt) {
      let validate = new FormValidation(form);
      switch (evt.target.name) {
        case "name":
          validate.checkName();
          break;
        case "email":
          validate.checkEmail();
          break;
        case "password":
          validate.checkPassword();
          break;
        case "passwordConfirm":
          validate.checkPasswordConfirm();
          break;
      }
    })
  );
}
function formSignUpDataValidate(form) {
  let validate = new FormValidation(form);
  let checkName = validate.checkName();
  let checkEmail = validate.checkEmail();
  let checkPassword = validate.checkPassword();
  let checkPasswordConfirm = validate.checkPasswordConfirm();
  let confirm = validate.checkConfirm();
  let isFormValid =
    checkName && checkEmail && checkPassword && checkPasswordConfirm && confirm;
  return isFormValid;
}
function formSignUpData() {
  let form = document.forms.namedItem("signup-form");
  formOnInputCheck(form);
  form.addEventListener("submit", function (evt) {
    let isFormValid = formSignUpDataValidate(form);

    if (!isFormValid) {
      evt.preventDefault();
      return;
    }
    let data = new FormData(this);
    fetch(`${form.action}`, {
      method: form.method,
      body: data
    })
      .then((response) => {
        return response.text;
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(`Error: ${error.message}`);
      });
  });
}
