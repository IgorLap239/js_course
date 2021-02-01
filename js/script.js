'use strict';

//функционал первого урока и второго урока
let money = 150000;
let income = 'freelance';
let addExpenses = 'Бензин, коммуналка, продукты';
let deposit = true;
let mission = 1000000;
let period = 12;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев. Цель заработать ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = 150000/30;
console.log(budgetDay);

//третий урок

//опрос пользователя
money = prompt('Ваш месячный доход?')

//дополнительные расходы
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через зарятую')

//проверка сбережений
deposit = confirm('Есть ли у Вас депозит в банке?');

//размер и вид обязательны расходов
let expenses1 = prompt('Введите обязательную статью расходов');
let expenses2 = prompt('Введите обязательную статью расходов');

let amount1 = +prompt('Введите сумму на ' + expenses1 + ' :');
if (isNaN(amount1)) {
    alert('Вы ввели данные в некорректном формате. Введите число.');
    amount1 = +prompt('Введите сумму на ' + expenses1 + ' :');
}

let amount2 = +prompt('Введите сумму на ' + expenses2 + ' :');
if (isNaN(amount2)) {
    alert('Вы ввели данные в некорректном формате. Введите число.');
    amount2 = +prompt('Введите сумму на ' + expenses2 + ' :');
}

//расчет бюджета на месяц
let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ',budgetMonth);

//расчет сроков достижения цели
let term = mission/budgetMonth;
console.log('Цель будет достигнута за ' + Math.ceil(term) + ' месяцев');

//расчет дневного бюджета
budgetDay = budgetMonth/30;
console.log('Дневной бюджет:', Math.floor(budgetDay));

//уровень дохода
if (budgetDay <= 600) {
    alert('К сожалению, у вас уровень дохода ниже среднего');
} else if (budgetDay > 600 && budgetDay <= 1200) {
    alert('У вас средний уровень дохода');
} else if (budgetDay > 1200) {
    alert('У вас высокий уровень дохода');
} else if (budgetDay < 0) {
    alert('Что то пошло не так');
}
