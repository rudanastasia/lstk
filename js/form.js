document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  if (!form) return;
  const submitButton = form.querySelector('button[type="submit"]');

  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    message: form.elements.message,
  };

  // ---------- Валидация полей ----------

  const validators = {
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        return 'Введите эл. почту в корректном формате';
      }

      return '';
    },
    message: (value) => {
      const v = value.trim();
      if (!v) return 'Введите сообщение (не менее 10 символов)';
      if (v.length < 10) return 'Сообщение должно содержать не менее 10 символов';
      return '';
    },
  };

  // ---------- Обработка ошибок заполнения полей ----------

  function getBaseClass(field) {
    return field.tagName === 'TEXTAREA' ? 'form__textarea' : 'form__input';
  }

  // Показываем ошибку (добавляем модификатор и выводим текст ошибки)
  function showError(field, message) {
    const baseClass = getBaseClass(field);
    field.classList.add(`${baseClass}--error`);

    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('form__error')) {
      errorElement = document.createElement('p');
      errorElement.className = 'form__error';
      field.after(errorElement);
    }
    errorElement.textContent = message;
  }

  // Убираем ошибку (снимаем модификатор и удаляем текст ошибки)
  function clearError(field) {
    const baseClass = getBaseClass(field);
    field.classList.remove(`${baseClass}--error`);

    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form__error')) {
      errorElement.remove();
    }
  }

  // ---------- Проверка полей формы и всей формы ----------

  function validateField(name) {
    const field = fields[name];
    const errorMessage = validators[name](field.value);

    if (errorMessage) {
      showError(field, errorMessage);
      return false;
    }

    clearError(field);
    return true;
  }

  function validateForm() {
    let isValid = true;
    for (const name in fields) {
      if (!validateField(name)) {
        isValid = false;
      }
    }

    return isValid;
  }

  // ---------- Сообщение отправки формы (успех/не успех) ----------

  function showFormMessage(text, isError) {
    let messageElement = form.querySelector('.form__status');

    if (!messageElement) {
      messageElement = document.createElement('p');
      messageElement.className = 'form__status';
      form.append(messageElement);
    }

    messageElement.textContent = text;
    messageElement.classList.toggle('form__status--error', isError);
  }

  // ---------- Отправка данных формы ----------

  async function sendForm() {
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
  }

  // ---------- Подключение обработчика ----------

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
      sendForm();
    }
  });

  // ---------- Проверяем поля до отправки формы ----------

  for (const name in fields) {
    const field = fields[name];

    // Проверяем поле после того, как пользователь его покинул
    field.addEventListener('blur', () => {
      validateField(name);
    });

    // Проверяем поле пока пользователь печатает (если ошибка уже показана - пропадет в случае исправления)
    field.addEventListener('input', () => {
      if (field.classList.contains(`&{getBaseClass(field)}--error`)) {
        validateField(name);
      }
    });
  }
});
