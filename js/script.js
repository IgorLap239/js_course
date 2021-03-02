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

    countTimer('26 february 2021');

    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('a')) {
                handlerMenu();
            }
        });
        btnMenu.addEventListener('click', handlerMenu);

    };

    toggleMenu();

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
                dayValue = 1;

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

            totalValue.textContent = total;
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

    //форма обратной связи
    const connect = () => {
        const connect = document.getElementById('connect');

        const connectFormInput = (e) => {
            const target = e.target;
            if (target.matches('input[placeholder="Ваше имя"]') || target.matches('input[placeholder="Ваше сообщение"]')) {
                target.value = target.value.replace(/[^А-Яа-я\- ]/g, '');
            } else if (target.matches('input[placeholder="E-mail"]')) {
                target.value = target.value.replace(/[^A-Za-z\-@_'`!\.\* ]/g, '');
            } else if (target.matches('input[placeholder="Номер телефона"]')) {
                target.value = target.value.replace(/^[-()]*\D/g, '');
            }
        };

        const connectFormValidation = (e) => {
            const target = e.target;
            target.value = target.value.replace(/ +/g, ' ').trim();
            target.value = target.value.replace(/-+/g, '-').
            target.value = target.value.replace(/^-*/g, '');
            target.value = target.value.replace(/-*$/g, '');
            if (target.matches('input[placeholder="Ваше имя"]')) {
                target.value = target.value[0].toUpperCase() + target.value.substr(1, ).toLowerCase();
            }
        };

        connect.addEventListener('input', connectFormInput);
        connect.addEventListener('focusout', connectFormValidation);
    };

    connect();

});