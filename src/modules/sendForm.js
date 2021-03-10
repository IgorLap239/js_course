const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        statusMessage = document.createElement('div');

    statusMessage.style.cssText = `font-size: 2rem;
  color: #ffffff;`;

    const formHandler = (event) => {
        event.preventDefault();
        const target = event.target;
        target.append(statusMessage);
        const formData = new FormData(target);
        let body = {};
        for (let val of formData.entries()) {
            body[val[0]] = val[1];
        }
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                clearInputs(target);
                setTimeout(() => {
                    statusMessage.remove();
                    if (document.querySelector('.popup').style.display === 'block') {
                        document.querySelector('.popup').style.display = 'none';
                    }
                }, 5000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    };

    const postData = (body) => {
        statusMessage.textContent = '';
        statusMessage.insertAdjacentHTML('afterBegin', `
              <progress id="elem"></progress>
              `);
        document.getElementById('elem').style.cssText = `
                  width: 5%;
              `;
        requestAnimationFrame(animate);
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    const animate = () => {
        let start = performance.now();
        const duration = 1000;
        let timeFraction = start / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    };

    const clearInputs = (target) => {
        target.querySelectorAll('input').forEach(item => {
            item.value = '';
            item.classList.remove('success');
        });
    };

    const eventListeners = () => {
        form1.addEventListener('submit', formHandler);
        form2.addEventListener('submit', formHandler);
        form3.addEventListener('submit', formHandler);
    };

    eventListeners();
};

export default sendForm;