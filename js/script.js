/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable prefer-const */
window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //таймер
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor(timeRemaining / 60) % 60,
                hours = Math.floor(timeRemaining / 60 / 60) % 24;
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            let timer = getTimeRemaining();
            if (timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }
            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();

    }

    countTimer('10 march 2021');

    //меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        const handlerMenu = (event) => {
            const target = event.target;
            if (menu.classList.contains('active-menu')) {
                if (target.closest('a') || target.closest('main')) {
                    menu.classList.toggle('active-menu');
                }
            } else if (!menu.classList.contains('active-menu')) {
                if (target.closest('.menu')) {
                    menu.classList.toggle('active-menu');
                }
            }
        };
        window.addEventListener('click', handlerMenu);

    };

    toggleMenu();

    //плавная прокрутка по кнопке
    const smoothScrolling = () => {
        const anchor = document.querySelector('a[href="#service-block"]');

        const scrolling = (event) => {
            event.preventDefault();
            const V = 1,
                blockID = anchor.getAttribute('href');
            let w = window.pageYOffset,
                t = document.querySelector(blockID).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                window.scrollTo(0, r);
                if (r !== w + t) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = blockID;
                }
            }
        };

        anchor.addEventListener('click', scrolling);
    };
    smoothScrolling();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if (document.documentElement.clientWidth > 768) {
                const draw = (timePassed) => {
                    popupContent.style.top = timePassed / 10 + 'px';

                };

                const start = Date.now(); // запомнить время начала
                const timer = setInterval(() => {
                    // сколько времени прошло с начала анимации?
                    const timePassed = Date.now() - start;
                    if (timePassed >= 1010) {
                        clearInterval(timer); // закончить анимацию через 2 секунды
                        return;
                    }

                    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
                    draw(timePassed);
                }, 20);
            }


        }));

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        tabContent[1].classList.add('d-none');
        tabContent[2].classList.add('d-none');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tab.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };


        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const addDot = (items) => {
            let li = document.createElement('li');
            li.classList.add('dot');
            li.classList.add('dot-active');
            dots.append(li);
            for (let i = 1; i < items; i++) {
                li = document.createElement('li');
                li.classList.add('dot');
                dots.append(li);
            }
            return document.querySelectorAll('.dot');
        };

        const dot = addDot(slide.length);
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide(1500);
            }
        });

        startSlide(1500);
    };

    slider();

    //калькулятор
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');


        const onlyNumbers = (e) => {
            const target = e.target;
            if (target.matches('input')) {
                target.value = target.value.replace(/\D/, '');
            }
        };

        const countSum = () => {
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            let total = 0,
                countValue = 1,
                dayValue = 1,
                oldTotal = +totalValue.textContent;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            let newTotal = parseInt(total),
                interval = 0;
            if (oldTotal > newTotal) {
                interval = setInterval(() => {
                    if (oldTotal === newTotal) {
                        totalValue.textContent = newTotal;
                        clearInterval(interval);
                    } else {
                        oldTotal -= 100;
                        totalValue.textContent = oldTotal;
                    }
                }, 10);
            } else if (oldTotal < newTotal) {
                interval = setInterval(() => {
                    if (oldTotal === newTotal) {
                        totalValue.textContent = newTotal;
                        clearInterval(interval);
                    } else {
                        oldTotal += 100;
                        totalValue.textContent = oldTotal;
                    }
                }, 10);
            }

        };

        calcBlock.addEventListener('input', onlyNumbers);
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calculator(100);

    //наша команда

    const command = () => {
        const command = document.querySelector('.command');
        let tmpSrc;

        const photoChanger = (e) => {
            if (e.target.matches('.command__photo')) {
                tmpSrc = e.target.src;
                e.target.src = e.target.dataset.img;
            }
        };

        const photoReturn = (e) => {
            if (e.target.matches('.command__photo')) {
                e.target.src = tmpSrc;
            }
        };

        command.addEventListener('mouseover', photoChanger);
        command.addEventListener('mouseout', photoReturn);

    };

    command();

    //валидация форм


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

    validation();

    //send-ajax-form

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
                    setTimeout(() => { statusMessage.remove() }, 5000)
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        };

        const postData = (body) => {
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

    sendForm();
});