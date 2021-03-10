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

export default calculator;