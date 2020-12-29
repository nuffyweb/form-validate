import CheckField from "./сheckField.js";
import { isPasswordSecure } from "../utils/simpleValide.js";
import { showError, Success } from "../utils/messages.js";

export default class CheckFieldPassword extends CheckField {
  Required() {
    super.Required();

    if (!isPasswordSecure(this.fieldVal)) {
      showError(this.field, "Пароль должен содержать не менее 8 символов");
      this.valid = false;
    } else {
      Success(this.field);
      this.valid = true;
    }
  }
}
