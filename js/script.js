'use strict';

//объявление переменных
let money;
let income;
let addExpenses;
let deposit;
let mission = 1000000;
let period;
let budgetDay;

//опрос пользователя
money = +prompt('Ваш месячный доход?');
if (isNaN(money)) {
    alert('Вы ввели данные в некорректном формате. Введите число.');
    money = +prompt('Ваш месячный доход?');
}

//дополнительные расходы
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через зарятую');

//проверка сбережений
deposit = confirm('Есть ли у Вас депозит в банке?');

//размер и вид обязательны расходов
let expenses1 = prompt('Введите обязательную статью расходов');

let amount1 = +prompt('Введите сумму на ' + expenses1 + ' :');
if (isNaN(amount1)) {
    alert('Вы ввели данные в некорректном формате. Введите число.');
    amount1 = +prompt('Введите сумму на ' + expenses1 + ' :');
}

let expenses2 = prompt('Введите обязательную статью расходов');


let amount2 = +prompt('Введите сумму на ' + expenses2 + ' :');
if (isNaN(amount2)) {
    alert('Вы ввели данные в некорректном формате. Введите число.');
    amount2 = +prompt('Введите сумму на ' + expenses2 + ' :');
}

//функции

//функция расчета суммы расходов
let getExpensesMonth = function (a, b){
    return a + b;
};

//функция расчета месячного бюджета
let getAccumulatedMonth = function (){
    return money - getExpensesMonth(amount1, amount2);
};

let accumulatedMonth = getAccumulatedMonth(money);

//функция расчета количества месяцев для достижения цели накоплений
let getTargetMonth = function () {
    return (Math.ceil(mission / accumulatedMonth));
};

//функция определения типа переменной
let showTypeOF = function (variable) {
    console.log(variable, typeof(variable));
};

//функия выводящая уровень дохода
let getStatusIncome = function (){
    if (budgetDay <= 600) {
        console.log('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay > 600 && budgetDay <= 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay < 0) {
        console.log('Что то пошло не так');
    }
};

//конец блока функций

//расчет дневного бюджета
budgetDay = Math.floor(accumulatedMonth/30);

//вывод в консоль
showTypeOF(money);
showTypeOF(addExpenses);

console.log('Расходы за месяц = ', getExpensesMonth(amount1, amount2));
console.log('Возможные дополнительные расходы: ', addExpenses.split(', '));
console.log('Месяцев для достижения цели: ', getTargetMonth());
console.log('Дневной бюджет = ', budgetDay);
getStatusIncome();