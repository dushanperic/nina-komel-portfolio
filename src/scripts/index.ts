import '../style/normalize.css';
import '../style/style.css';
import { checkIsAuthorized, renderWorks, localStorageKey } from './works';
import { renderForm } from './form';
const passwordToggler = document.querySelector<HTMLSpanElement>(
  '#visibility-toggler'
);
const passwordInput =
  document.querySelector<HTMLInputElement>('#preview-password');

const togglePasswordVisibity = () => {
  if (passwordInput?.type) {
    passwordInput.setAttribute(
      'type',
      passwordInput?.type === 'password' ? 'text' : 'password'
    );
  }

  if (passwordToggler) {
    passwordToggler.innerHTML =
      passwordInput?.type === 'password' ? `&#128526;` : `&#128064;`;
  }
};
window.addEventListener('load', () => {
  const storageData = window.localStorage.getItem(localStorageKey);
  const _storageData = storageData ? JSON.parse(storageData) : null;

  const yearSlot = document.querySelector<HTMLSpanElement>('#js-current-year');

  const { isAuthorized } = checkIsAuthorized(_storageData);

  if (isAuthorized) {
    renderWorks();
  } else {
    renderForm();
  }
  if (yearSlot) {
    yearSlot.innerHTML = String(new Date().getFullYear());
  }

  passwordToggler?.addEventListener('click', togglePasswordVisibity);
});
