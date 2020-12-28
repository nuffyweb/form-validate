import CheckField from './сheckField.js';
import { isEmailValid } from '../utils/simpleValide.js';
import { showError, Success } from '../utils/messages.js';

export default class CheckFieldEmail extends CheckField {
  Required() {
    super.Required();

    if (!isEmailValid(this.fieldVal)) {
      showError(this.field, 'Введите корректный email');
      this.valid = false;
    } else {
      Success(this.field);
      this.valid = true;
    }
  }
}
