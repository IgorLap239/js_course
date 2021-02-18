'use strict';

const start = document.getElementById('start'),
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
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      depositBank = document.querySelector('.deposit-bank');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

start.disabled = true;

class AppData {
  constructor() {
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
  }

  start() {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();

    const inputOff = () => {
      const arrayOfInputs = document.querySelectorAll('.data input');
      arrayOfInputs.forEach((e) => {
        e.disabled = true;
        periodSelect.disabled = false;
      });
    };
    inputOff();

    const changeButton = () => {
      document.getElementById('start').style.display = 'none';
      document.getElementById('cancel').style.display = 'block';
    };
    changeButton();
  }

  reset() {
    const clearInputs = () => {
      const arrayOfInputs = document.querySelectorAll('input');
      arrayOfInputs.forEach((e) => {
        e.value = '';
        e.disabled = false;
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
    
    document.getElementById('start').style.display = '';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('deposit-check').checked = false;
    incomeAddButton.style.display = '';
    expensesAddButton.style.display = '';

    start.disabled = true;
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth; 
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAddButton.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAddButton.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((e) => {
      let itemExpenses = e.querySelector('.expenses-title').value;
      let cashExpenses = e.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItems.forEach((e) => {
      let itemIncome = e.querySelector('.income-title').value;
      let cashIncome = e.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  } 

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((e) => {
      e = e.trim();
      if (e !== '') {
        this.addExpenses.push(e);
      }
    }); 
  }

  getAddIncome() {
    additionalIncomeItem.forEach((e) => {
      let itemValue = e.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  //функция расчета суммы расходов
  getExpensesMonth() {
      for (let key in this.expenses) {
          this.expensesMonth = +this.expensesMonth + this.expenses[key];
      }
  }

  //функция расчета суммы доходов
  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth = this.incomeMonth + this.income[key];
    }
  }

  //функция расчета месячного бюджета
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  //функция расчета количества месяцев для достижения цели накоплений
  getTargetMonth() {
      return (targetAmount.value / this.budgetMonth);
  }

  calcSavedMoney() {
    periodAmount.textContent = periodSelect.value;
    return this.budgetMonth * periodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }

  depositPercentChecker() {
    if (!(this.isNumber(depositPercent.value)) || 0 >= +depositPercent.value || +depositPercent.value >= 100) {
      start.disabled = true;
      alert("Введите корректное значение в поле проценты");
    } else {
      start.disabled = false;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    const inputValue = () => {
      if (salaryAmount.value === '') {
        document.getElementById('start').disabled = true;
      } else {
        document.getElementById('start').disabled = false;
      }
    };
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    
    salaryAmount.addEventListener('change', inputValue);
    expensesAddButton.addEventListener('click', this.addExpensesBlock);
    incomeAddButton.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.calcSavedMoney.bind(this));
    periodSelect.addEventListener('input', this.showResult.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('change', this.depositPercentChecker.bind(this));
  }
}

let appData = new AppData();

appData.eventListeners();

