import { renderWorks, setStorage } from './works';

const _input = '123';
const formContainer = document.querySelector<HTMLDivElement>('#form-container');

export const handleSubmit = (e: SubmitEvent) => {
  const input = document.querySelector<HTMLInputElement>('#preview-password');

  e.preventDefault();

  const inputVal = input?.value;

  if (inputVal === _input) {
    setStorage(JSON.stringify(new Date()));
    renderWorks();
    formContainer?.remove();
  }
};

export const togglePasswordVisibity = (e: MouseEvent) => {
  const input = document.querySelector<HTMLInputElement>('#preview-password');

  const { target } = e;
  if (input?.type) {
    input.setAttribute(
      'type',
      input?.type === 'password' ? 'text' : 'password'
    );
  }

  if (target && target instanceof HTMLElement) {
    target.innerHTML = input?.type === 'password' ? `&#128526;` : `&#128064;`;
  }
};

export const renderForm = () => {
  if (!formContainer) return;

  formContainer.innerHTML = `
      <form id="password-form" class="password-form">
        <label for="preview-password">Password</label>
        <input
          type="password"
          name="preview-password"
          id="preview-password"
          class="form-input"
        />
        <span
          tabindex="0"
          class="visibility-toggler"
          id="visibility-toggler"
          title="Toggle password visibility"
          >&#128526;</span
        >
        <button type="submit">Ok</button>
      </form>
      `;

  const form: HTMLElement | null = document.getElementById('password-form');
  form?.addEventListener('submit', (e) => handleSubmit(e));

  const passwordToggler = document.querySelector<HTMLSpanElement>(
    '#visibility-toggler'
  );

  passwordToggler?.addEventListener('click', (e) => {
    togglePasswordVisibity(e);
  });
};
