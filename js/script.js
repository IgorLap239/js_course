'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

start.disabled = true;

let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses : {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {

      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getIncomeMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();

      this.showResult();

      let inputOff = function () {
        let arrayOfInputs = document.querySelectorAll('.data input');
        arrayOfInputs.forEach(function(item) {
          item.style.backgroundColor = 'grey';
          item.readOnly = true;
        });
      };
      inputOff();

      let changeButton = function () {
        document.getElementById('start').style.display = 'none';
        document.getElementById('cancel').style.display = 'block';
      };
      changeButton();

    },

    reset: function () {
      let clearInputs = function () {
        let arrayOfInputs = document.querySelectorAll('input');
        arrayOfInputs.forEach(function(item) {
          item.value = '';
          item.readOnly = false;
          item.style.backgroundColor = '';
        });

        if (incomeItems.length > 1) {
          for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        incomeItems.length = 1;
        }

        if (expensesItems.length > 1) {
          for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }
        expensesItems.length = 1;
        }
        
      };
      clearInputs();
      periodSelect.value = 1;
      
      document.getElementById('start').style.display = '';
      document.getElementById('cancel').style.display = 'none';
      document.getElementById('deposit-check').checked = false;

      start.disabled = true;
    },

    showResult: function () {

      budgetMonthValue.value = appData.budgetMonth; 
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcSavedMoney();
    },

    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
      
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
        expensesAddButton.style.display = 'none';
      }
    },

    addIncomeBlock: function() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
      
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
        incomeAddButton.style.display = 'none';
      }
    },

    getExpenses: function () {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      });
    },

    getIncome: function () {
      incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = +cashIncome;
        }
      });
 
    },  
    
    getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      }); 
    },

    getAddIncome: function () {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },

    //функция расчета суммы расходов
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            appData.expensesMonth = +this.expensesMonth + this.expenses[key];
        }
    },

    //функция расчета суммы доходов
    getIncomeMonth: function () {
      for (let key in this.income) {
        appData.incomeMonth = this.incomeMonth + this.income[key];
      }
    },

    //функция расчета месячного бюджета
    getBudget: function () {
      appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      appData.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    //функция расчета количества месяцев для достижения цели накоплений
    getTargetMonth: function () {
        return (targetAmount.value / this.budgetMonth);
    },

    /*getInfoDepost: function() {
      if(appData.deposit) {
        do {
            appData.percentDeposit = prompt('Какой годовой проент?', '10');
        } while (isNumber(appData.percentDeposit));
        do {
            appData.moneyDeposit = prompt('Какая сумма вложена?', 10000);
        } while (!isNumber(appData.moneyDeposit));
      }
    },*/

    calcSavedMoney: function() {
      periodAmount.textContent = periodSelect.value;
      return this.budgetMonth * periodSelect.value;
    }
};

let inputValue = function () {
  if (salaryAmount.value === '') {
    document.getElementById('start').disabled = true;
  } else {
    document.getElementById('start').disabled = false;
  }
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset);

salaryAmount.addEventListener('change', inputValue);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.calcSavedMoney);
periodSelect.addEventListener('input', appData.showResult);