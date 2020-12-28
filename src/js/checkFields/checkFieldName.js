import CheckField from './сheckField.js';
import { isBetween } from '../utils/simpleValide.js';
import { showError, Success } from '../utils/messages.js';

export default class CheckFieldName extends CheckField {
  Required() {
    super.Required();

    if (!isBetween(this.fieldVal.length, 3, 25)) {
      showError(this.field, 'Имя должно быть больше 3 символов и меньше 25');
      this.valid = false;
    } else {
      Success(this.field);
      this.valid = true;
    }
  }
}
