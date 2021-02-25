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
            console.log(typeof(minutes));
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
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => elem.addEventListener('click', () => {
            popup.style.display = 'block';
            // в то время как timePassed идёт от 0 до 2000
            // left изменяет значение от 0px до 400px
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

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();

});