import CheckField from './сheckField.js';
import { showError, Success } from '../utils/messages.js';

export default class CheckFieldPasswordConfirm extends CheckField {
  constructor(field, fieldConfirmWith) {
    super(field);
    this.fieldConfirmWith = fieldConfirmWith;
    this.fieldConfirmWithVal = fieldConfirmWith.value.trim();
  }

  Required() {
    super.Required();

    if (!(this.fieldVal === this.fieldConfirmWithVal)) {
      showError(this.field, 'Пароли не совпадают')
      this.valid = false;
    } else {
      Success(this.field);
      this.valid = true;
    }
  }
}
