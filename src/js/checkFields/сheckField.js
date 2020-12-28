import { isEmpty } from '../utils/simpleValide.js';
import { showError } from '../utils/messages.js';

let defaultConfig = {
  classForm: 'form',
  classField: 'form__field',
  classCheck: 'form__validate',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'form__field',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
};

export default class CheckField {
  constructor(field) {
    this.field = field;
    this.fieldVal = this.field.value.trim();
    this.valid = false;
  }

  Required() {
    if (isEmpty(this.fieldVal)) {
      showError(this.field, 'Поле не может быть пустым');
      this.valid = false;
    }
  }
}
