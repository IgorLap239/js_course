'use strict';

let money,
    budgetDay;

//объявление переменных
let mission = 1000000; 

//размер и вид обязательны расходов
let expenses = [];

//функции

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function () {

    do  {
        money = prompt('Ваш месячный доход?(число)');
    } while (!isNumber(money));

};

start();

//функция расчета суммы расходов
let getExpensesMonth = function () {
    let sum = 0;
    let temp;

    for(let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов:');

        do {
            temp = prompt('Сколько это будет стоить?(число)');
        } while (!isNumber(temp));
        sum += +temp;
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

//функция расчета месячного бюджета
let getAccumulatedMonth = function () {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth(money);

//функция расчета количества месяцев для достижения цели накоплений
let getTargetMonth = function () {
    let months = (Math.ceil(mission / accumulatedMonth));
    if (months > 0) {
        return 'Цель будет достигнута за ' + months + ' месяцев';
    } else {
        return 'Цель не будет достигнута';
    }
     
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

//дополнительные расходы
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через зарятую');

//проверка сбережений
let deposit = confirm('Есть ли у Вас депозит в банке?');

//расчет дневного бюджета
budgetDay = Math.floor(accumulatedMonth/30);

//вывод в консоль
showTypeOF(money);
showTypeOF(addExpenses);

console.log('Расходы за месяц = ', expensesAmount);
console.log('Возможные дополнительные расходы: ', addExpenses.split(', '));
console.log(getTargetMonth());
console.log('Дневной бюджет = ', budgetDay);
getStatusIncome();