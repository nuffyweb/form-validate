const errorTemplate = (message) => `<span class="form-error">${message}</span>`;
const successTemplate = (message) =>
  `<span class="form-success">${message}</span>`;
const successRestoreTemplate = (title, message) => {
  return `
    <div class="form-message">
      <div class="form-message__title">
      ${title}
      </div>
      <div class="form-message__text">
      ${message}
      </div>
  </div>
    `;
};
const showError = (input, message) => {
  const formField = input.closest(".form__field");

  formField.classList.remove("success");
  formField.classList.add("error");
  if (message) {
    const errorField = formField.querySelector(".form__error");
    errorField.textContent = "";
    errorField.textContent = message;
  }
};
const Success = (input) => {
  const formField = input.closest(".form__field");
  const errorField = formField.querySelector(".form__error");
  errorField.textContent = "";
  formField.classList.remove("error");
  formField.classList.add("success");
};
export {
  errorTemplate,
  successTemplate,
  successRestoreTemplate,
  showError,
  Success
};
