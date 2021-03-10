const validation = () => {
    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        email = document.querySelectorAll('.form-email'),
        formBtn = document.querySelectorAll('.form-btn');

    email.forEach(item => {
        item.setAttribute("required", "required");
    });

    const connectFormInput = (e) => {
        const target = e.target;
        if (target.matches('input[placeholder="Ваше имя"]')) {
            target.value = target.value.replace(/[^А-Яа-я ]/g, '');
        } else if (target.matches('input[placeholder="Ваше сообщение"]')) {
            target.value = target.value.replace(/[^А-Яа-я,\.\?!^0-9 ]/g, '');
        } else if (target.matches('input[placeholder="E-mail"]') || target.matches('input[placeholder="Ваш E-mail"]')) {
            target.setAttribute("required", "required");
            target.value = target.value.replace(/[^A-Za-z\-@_'`!\.\* ]/g, '');
        } else if (target.matches('input[placeholder="Номер телефона"]') || target.matches('input[placeholder="Ваш номер телефона"]')) {
            target.value = target.value.replace(/[^0-9\+]/g, '');
        }
    };

    const connectFormValidation = (e) => {
        const target = e.target;
        target.value = target.value.replace(/ +/g, ' ').trim();
        target.value = target.value.replace(/-+/g, '-');
        target.value = target.value.replace(/^-*/g, '');
        target.value = target.value.replace(/-*$/g, '');
        if (target.matches('input[placeholder="Ваше имя"]')) {
            if (target.value.length < 2) {
                showError(target);
                target.closest('form').querySelector('.form-btn').setAttribute("disabled", "disabled");
            } else {
                showSuccess(target);
                target.closest('form').querySelector('.form-btn').removeAttribute("disabled");
                target.value = target.value[0].toUpperCase() + target.value.substr(1, ).toLowerCase();
            }
        }
        if (target.matches('input[placeholder="Номер телефона"]') || target.matches('input[placeholder="Ваш номер телефона"]')) {
            if ((target.value[0] !== '+' && target.value.length === 7) || (target.value[0] !== '+' && target.value.length === 11) || (target.value[0] === '+' && target.value.length === 12)) {
                showSuccess(target);
                target.closest('form').querySelector('.form-btn').removeAttribute("disabled");
            } else {
                showError(target);
                target.closest('form').querySelector('.form-btn').setAttribute("disabled", "disabled");
            }
        }
    };

    const showError = (elem) => {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        if (elem.matches('input[placeholder="Ваше имя"]')) {
            errorDiv.textContent = 'Имя должно состоять минимум из 2 символов';
        } else if (elem.matches('input[placeholder="Номер телефона"]') || elem.matches('input[placeholder="Ваш номер телефона"]')) {
            errorDiv.textContent = 'Это не номер телефона';
        }
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    };

    const showSuccess = (elem) => {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    };

    const applyStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
          border: 2px solid green !important;
        }
        input.error {
          border: 2px solid red  !important;
        }

        .validator-error {
          font-size: 12px;
          font-family: sans-serif;
          color: red;
        }
        `;

        document.head.appendChild(style);
    };
    applyStyle();

    const eventListeners = () => {
        form1.addEventListener('input', connectFormInput);
        form1.addEventListener('focusout', connectFormValidation);
        form2.addEventListener('input', connectFormInput);
        form2.addEventListener('focusout', connectFormValidation);
        form3.addEventListener('input', connectFormInput);
        form3.addEventListener('focusout', connectFormValidation);
    };

    eventListeners();

};

export default validation;