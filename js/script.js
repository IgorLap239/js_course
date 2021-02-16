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

start.disabled = true;

let inputValue = function () {
  if (salaryAmount.value === '') {
    document.getElementById('start').disabled = true;
  } else {
    document.getElementById('start').disabled = false;
  }
};

const AppData = function () {

  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
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
      item.disabled = true;
      periodSelect.disabled = false;
    });
  };
  inputOff();

  let changeButton = function () {
    document.getElementById('start').style.display = 'none';
    document.getElementById('cancel').style.display = 'block';
  };
  changeButton();
};

AppData.prototype.reset = function () {
  let clearInputs = function () {
    let arrayOfInputs = document.querySelectorAll('input');
    arrayOfInputs.forEach(function(item) {
      item.value = '';
      item.disabled = false;
    });

    if (incomeItems.length > 1) {
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
    }
    }

    if (expensesItems.length > 1) {
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
    }
    }  
  };
  clearInputs();
  periodSelect.value = 1;
  periodAmount.textContent = 1;

  
  document.getElementById('start').style.display = '';
  document.getElementById('cancel').style.display = 'none';
  document.getElementById('deposit-check').checked = false;
  incomeAddButton.style.display = '';
  expensesAddButton.style.display = '';

  start.disabled = true;
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth; 
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
  
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    expensesAddButton.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
  
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomeAddButton.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    }
  });

};  

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  }); 
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

//функция расчета суммы расходов
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth = +this.expensesMonth + this.expenses[key];
    }
};

//функция расчета суммы доходов
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth = this.incomeMonth + this.income[key];
  }
};

//функция расчета месячного бюджета
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
//функция расчета количества месяцев для достижения цели накоплений
AppData.prototype.getTargetMonth = function () {
    return (targetAmount.value / this.budgetMonth);
};

AppData.prototype.calcSavedMoney = function() {
  periodAmount.textContent = periodSelect.value;
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListeners = function () {
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset);
  
  salaryAmount.addEventListener('change', inputValue);
  expensesAddButton.addEventListener('click', this.addExpensesBlock);
  incomeAddButton.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.calcSavedMoney.bind(this));
  periodSelect.addEventListener('input', this.showResult.bind(this)); 
};


let appData = new AppData();

appData.eventListeners();

