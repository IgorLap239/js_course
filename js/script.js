'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {

        do  {
            money = prompt('Ваш месячный доход?(число)');
        } while (!isNumber(money));

    };

let appData = {
    income: {},
    addIncome: [],
    expenses : {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget: start(),
    asking: function () {
        //дополнительные расходы
        let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через зарятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        //проверка сбережений
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        let temp;
        for(let i = 0; i < 2; i++) {
            let tempExpenses = prompt('Введите обязательную статью расходов:');
            do {
                temp = prompt('Сколько это будет стоить?(число)');
            } while (!isNumber(temp));
            appData.expenses[tempExpenses] = +temp;
        }        
    },
    //функция расчета суммы расходов
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
        }
    },
    //функция расчета месячного бюджета
    getBudget: function () {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        //return money - appData.expensesMonth;
    },
    //функция расчета количества месяцев для достижения цели накоплений
    getTargetMonth: function () {
        let months = (Math.ceil(appData.mission / appData.budgetMonth));
        if (months > 0) {
            return 'Цель будет достигнута за ' + months + ' месяцев';
        } else {
            return 'Цель не будет достигнута';
        }  
    },
    //функия выводящая уровень дохода
    getStatusIncome: function (){
        if (appData.budgetDay <= 600) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    }
};

appData.asking();

appData.getExpensesMonth();

appData.getBudget();

//вывод в консоль
console.log('Расходы за месяц = ', appData.expensesMonth);
console.log(appData.getTargetMonth());
appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log (key + ' : ' + appData[key]);
}
