import { renderWorks, setStorage } from './works';

const _input_match = '123';
const formContainer = document.querySelector<HTMLDivElement>('#form-container');

const handleError = (msg: string) => {
  const errorContainer =
    document.querySelector<HTMLSpanElement>('#error-message');

  if (!errorContainer) return;

  errorContainer.innerHTML = msg;
};

export const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const input = document.querySelector<HTMLInputElement>('#preview-password');
  const isValid = validate(input?.value as string);

  if (isValid) {
    setStorage(JSON.stringify(new Date()));
    renderWorks();
    formContainer?.remove();
  } else {
    handleError('Wrong password...');
  }
};

const validate = (value: string) => value === _input_match;

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
        <div>
            <label for="preview-password" class="hidden">Password</label>
            <input
                type="password"
                placeholder="Please enter password"
                name="preview-password"
                id="preview-password"
                class="form-input"
            />
            <span
                tabindex="0"
                class="visibility-toggler"
                id="visibility-toggler"
                title="Toggle password visibility">
                &#128526;
            </span>
            <button type="submit">Ok</button>
        </div>
        <span id="error-message" class="error-message"></span>
      </form>
      `;

  const form: HTMLElement | null = document.getElementById('password-form');
  const passwordToggler = document.querySelector<HTMLSpanElement>(
    '#visibility-toggler'
  );
  const passwordInput =
    document.querySelector<HTMLInputElement>('#preview-password');

  form?.addEventListener('submit', (e) => handleSubmit(e));
  passwordInput?.addEventListener('input', () => {
    handleError('');
  });
  passwordToggler?.addEventListener('click', (e) => {
    togglePasswordVisibity(e);
  });
};
