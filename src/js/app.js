import '../scss/app.scss';

import {isEmpty, isEmailValid, isPasswordSecure, isBetween, isSame} from "./utils/simpleValide.js";
import {errorTemplate, successTemplate, successRestoreTemplate, showError, Success} from "./utils/messages.js";
import CheckFieldName from "./checkFields/checkFieldName.js";
import CheckFieldEmail from "./checkFields/checkFieldEmail.js";
import CheckFieldPassword from "./checkFields/checkFieldEmail.js";
import CheckFieldPasswordConfirm from "./checkFields/checkFieldPasswordConfirm.js";
import CheckConfirm from "./checkFields/checkConfirm.js";
import { debounce } from "./utils/helpers.js";
class CustomUploadFile {
    static fileNameTemplate = (text) => {
        return `<span class="custom-upload__name">${text}</span>`;
    }
    constructor(container) {
        this._container = container;
        this._input = this._container.querySelector('.js--custom-upload__input');
        this._customInput = this._container.querySelector('.js--custom-upload');
        this._noFile = this._container.querySelector('.js-no-file');
        this._fileNameWrapper = this._container.querySelector('.js-file-name');
        this._file = {};
        this._removeFilesButton = this._container.querySelector('.js-remove-files');
        this._addEventListeners();

    }

    _addEventListeners = () => {
        this._customInput.addEventListener('click', this._handleContainerClick.bind(this), false);
        this._input.addEventListener('change', this._handleRealInputChange, false);
        this._removeFilesButton.addEventListener('click', this._handleRemoveFilesButtonClick, false);
    }
    _handleContainerClick = () => {
        let name = this._fileNameWrapper.querySelectorAll('.custom-upload__name');
        if (name.length > 0) {
            this._removeChips();
            this._toggleNoFile();
        }

        this._input.click();
    }
    _handleRealInputChange = (evt) => {
        if (this._input.files.length > 0) {
            this._toggleNoFile();
            const name = this._input.files[0].name;
            this._fileNameWrapper.innerHTML = '';
            this._file = '';
            const chipTemplate = CustomUploadFile.fileNameTemplate(name);

            this._fileNameWrapper.insertAdjacentHTML('beforeend', chipTemplate);
            const chip = this._fileNameWrapper.querySelector(`.custom-upload__name`);
            this._file = { name, chip: chip };

        }

    }
    _handleRemoveFilesButtonClick = (e) => {
        if (this._input.files.length) {
            this._removeChips();
            this._toggleNoFile();
        }
    }
    _removeChips = () => {

        this._fileNameWrapper.innerHTML = '';
        this._input.value = '';
    }
    _toggleNoFile = () => {
        this._noFile.hidden = !this._noFile.hidden;
        this._removeFilesButton.hidden = !this._removeFilesButton.hidden;
    }

};
document.addEventListener("DOMContentLoaded", function () {


    showPassword('.js-toogle-password');
    formSignUpData();

});





class FormValidation {
    constructor(form) {
        this._form = form;
        this._elements = this._form.elements;
        this._name = this._elements.name || '';
        this._email = this._elements.email || '';
        this._password = this._elements.password || '';
        this._passwordConfirm = this._elements.passwordConfirm || '';
        this._confirm = this._elements.confirm || '';
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
        let checkPasswordConfirm = new CheckFieldPasswordConfirm(this._passwordConfirm, this._password)
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
    form.addEventListener('input', debounce(function (evt) {
        let validate = new FormValidation(form);
        console.log(evt);
        switch (evt.target.name) {
            case 'name':
                validate.checkName();
                break;
            case 'email':
                validate.checkEmail();
                break;
            case 'password':
                validate.checkPassword();
                break;
            case 'passwordConfirm':
                validate.checkPasswordConfirm();
                break;
        }
    }));
}
function showSuccessRestoreMessage() {
    let modalBody = document.querySelector('#page-modal__restore');
    let successText = 'На указанный вами e-mail направлено письмо со ссылкой для создания нового пароля.'
    let successLayout = successRestoreTemplate('Готово!', successText);
    modalBody.innerHTML = '';
    modalBody.insertAdjacentHTML('afterBegin', successLayout);
}
function formRestoreData() {
    let form = document.forms.namedItem("restore-form");
    formOnInputCheck(form);
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        let validate = new FormValidation(form);
        let checkEmail = validate.checkEmail();
        let isFormValid = checkEmail;
        if (!isFormValid) return
        let data = new FormData(this);
        fetch(`${form.action}`, {
            method: form.method,
            body: data
        })
            .then(response => {
                if (response.ok) {
                    showSuccessRestoreMessage();
                }
                return response.text;
            })
            .then(data => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(`Error: ${error.message}`);
            });
    });
}
function formSignInData() {
    let form = document.forms.namedItem("signin-form");
    formOnInputCheck(form);
    form.addEventListener('submit', function (evt) {
        let validate = new FormValidation(form);
        let checkEmail = validate.checkEmail();
        let checkPassword = validate.checkPassword();
        let isFormValid = checkEmail && checkPassword;
        if (!isFormValid) { evt.preventDefault(); return }
        let data = new FormData(this);
        fetch(`${form.action}`, {
            method: form.method,
            body: data
        })
            .then(response => {
                return response.text;
            })
            .then(data => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(`Error: ${error.message}`);
            });
    });
}
function formSignUpData() {
    let form = document.forms.namedItem("signup-form");
    formOnInputCheck(form);
    form.addEventListener('submit', function (evt) {

        let validate = new FormValidation(form);
        let checkName = validate.checkName();
        let checkEmail = validate.checkEmail();
        let checkPassword = validate.checkPassword();
        let checkPasswordConfirm = validate.checkPasswordConfirm();
        let confirm = validate.checkConfirm();
        let isFormValid = checkName && checkEmail && checkPassword && checkPasswordConfirm && confirm;
        if (!isFormValid) { evt.preventDefault(); return }
        let data = new FormData(this);
        fetch(`${form.action}`, {
            method: form.method,
            body: data
        })
            .then(response => {
                return response.text;
            })
            .then(data => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(`Error: ${error.message}`);
            });
    });
}
function showPassword(toggleClass) {
    let toggles = document.querySelectorAll(toggleClass);
    toggles = Array.prototype.slice.call(toggles);
    toggles.forEach(toggle => {

        let input = toggle.closest('.form__field').querySelector('.js-input-password');
        toggle.addEventListener('click', (evt) => {
            evt.preventDefault;
            toggle.classList.toggle('show');
            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }

        });
    })

}

