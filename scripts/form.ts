type FieldName = 'name' | 'email' | 'message';
type Field = HTMLInputElement | HTMLTextAreaElement;

// ---------- Правила валидации ----------

const validators: Record<FieldName, (value: string) => string> = {
  name: (value) => {
    const v = value.trim();
    if (!v) return 'Введите имя';
    if (v.length < 2) return 'Имя слишком короткое';
    if (!/^[а-яёa-z]+(?:\s+[а-яёa-z]+)*$/i.test(v)) return 'Имя должно содержать только буквы';
    return '';
  },
  email: (value) => {
    const v = value.trim();
    if (!v) return 'Введите эл. почту';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Введите эл. почту в корректном формате';
    return '';
  },
  message: (value) => {
    const v = value.trim();
    if (!v) return 'Введите сообщение (не менее 10 символов)';
    if (v.length < 10) return 'Сообщение должно содержать не менее 10 символов';
    return '';
  },
};

const fieldNames = Object.keys(validators) as FieldName[];

// ---------- Отображение ошибок ----------

const getErrorClass = (field: Field): string =>
  `${field instanceof HTMLTextAreaElement ? 'form__textarea' : 'form__input'}--error`;

// Показывает ошибку под полем или убирает её, если message пустой
function renderError(field: Field, message: string): void {
  field.classList.toggle(getErrorClass(field), Boolean(message));

  const next = field.nextElementSibling;
  let errorElement = next?.matches('.form__error') ? next : null;

  if (!message) {
    errorElement?.remove();
    return;
  }

  if (!errorElement) {
    errorElement = document.createElement('p');
    errorElement.className = 'form__error';
    field.after(errorElement);
  }
  errorElement.textContent = message;
}

// ---------- Форма ----------

function initForm(): void {
  const form = document.querySelector<HTMLFormElement>('.form');
  const submitButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !submitButton) return;

  const fields = {} as Record<FieldName, Field>;
  for (const name of fieldNames) {
    const field = form.querySelector<Field>(`[name="${name}"]`);
    if (!field) return;
    fields[name] = field;
  }

  const validateField = (name: FieldName): boolean => {
    const message = validators[name](fields[name].value);
    renderError(fields[name], message);
    return !message;
  };

  // map, а не every/some: нужно проверить все поля сразу, чтобы показать все ошибки
  const validateForm = (): boolean => fieldNames.map((name) => validateField(name)).every(Boolean);

  const showFormMessage = (text: string, isError: boolean): void => {
    let status = form.querySelector<HTMLElement>('.form__status');

    if (!status) {
      status = document.createElement('p');
      status.className = 'form__status';
      form.append(status);
    }

    status.textContent = text;
    status.classList.toggle('form__status--error', isError);
  };

  const sendForm = async (): Promise<void> => {
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        showFormMessage('Спасибо! Ваше сообщение отправлено.', false);
      } else {
        showFormMessage('Не удалось отправить сообщение. Попробуйте позже.', true);
      }
    } catch {
      showFormMessage('Ошибка сети. Проверьте подключение и попробуйте снова', true);
    } finally {
      submitButton.disabled = false;
    }
  };

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    if (validateForm()) void sendForm();
  });

  for (const name of fieldNames) {
    const field = fields[name];

    // проверяем поле, когда пользователь его покинул
    field.addEventListener('blur', () => validateField(name));

    // пока печатает: перепроверяем только если ошибка уже показана (чтобы пропала после исправления)
    field.addEventListener('input', () => {
      if (field.classList.contains(getErrorClass(field))) validateField(name);
    });
  }
}

initForm();

export {};
