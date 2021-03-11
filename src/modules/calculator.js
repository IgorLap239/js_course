const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    let interval;


    const onlyNumbers = (e) => {
        const target = e.target;
        if (target.matches('input')) {
            target.value = target.value.replace(/\D/, '');
        }
    };

    const countSum = () => {
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
        let countValue = 1,
            dayValue = 1;
        if (typeValue === '' || squareValue === 0 || calcSquare.textContent !== '') {
            return 0;
        }
        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            return parseInt(price * typeValue * squareValue * countValue * dayValue);
        }
    };

    const totalAnimate = (newTotal, oldTotal) => {
        interval = setInterval(() => {
            if (oldTotal === newTotal) {
                totalValue.textContent = newTotal;
            } else {
                oldTotal += 100;
                totalValue.textContent = oldTotal;
            }
        }, 10);
    };

    const startAnim = () => {
        let oldTotal = 0,
            newTotal = countSum();
        totalAnimate(newTotal, oldTotal);
    };

    const stopAnim = () => {
        clearInterval(interval);
    };

    calcBlock.addEventListener('input', onlyNumbers);
    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target.matches('select') || target.matches('input')) {
            if (calcSquare.value !== 0 && calcSquare.textContent !== ' ' && calcType.value !== '') {
                stopAnim();
                startAnim();
            } else {
                totalValue.textContent = 0;
                return;
            }
        }
    });
};

export default calculator;