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

export default togglePopUp;