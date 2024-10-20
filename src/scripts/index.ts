import '../style/normalize.css';
import '../style/style.css';
import { checkIsAuthorized, renderWorks, localStorageKey } from './works';
import { renderForm } from './form';

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
});
