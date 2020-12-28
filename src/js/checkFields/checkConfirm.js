import { showError, Success } from '../utils/messages.js';

export default class CheckConfirm {
  constructor(field) {
    this.field = field;
    this.valid = false;
  }

  Required() {
    if (!this.field.checked) {
      showError(this.field);
      this.valid = false;
    } else {
      Success(this.field);
      this.valid = true;
    }
  }
}
