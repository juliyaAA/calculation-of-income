let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudget = document.getElementsByClassName('daybudget-value')[0],
    level = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    income = document.getElementsByClassName('income-value')[0],
    monthsavings = document.getElementsByClassName('monthsavings-value')[0],
    yearSavings = document.getElementsByClassName('yearsavings-value')[0],
    yearValue = document.getElementsByClassName('year-value')[0],
    monthValue = document.getElementsByClassName('month-value')[0],
    dayValue = document.getElementsByClassName('day-value')[0],
    expensesInp = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    optionalExpensesItem = document.getElementsByClassName('optionalexpenses-item'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    countBudgetBtn = document.getElementsByTagName('button')[2],
    chooseIncome = document.querySelector('.choose-income'),
    incomeValue = document.getElementsByClassName('income-value')[0],
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('#percent');
console.log(optionalExpensesItem);
let money, time;

startBtn.addEventListener('click', function() {
	time = prompt ('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt ('Ваш бюджет на месяц?', '');
  	while(isNaN(money) || money == '' || money == null) {
        money = prompt ('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;
    for (i = 0; i < expensesInp.length; i++) {
        let a = expensesInp[i].value,
            b = expensesInp[++i].value;
        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 30) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
    console.log('Ok');
});

optionalExpensesBtn.addEventListener('click', function() {
    for (i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        console.log('расходы необязательные');
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function() {
    if(appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudget.textContent = appData.moneyPerDay;

        if( appData.moneyPerDay < 100) {
            level.textContent = 'Низкий уровень дохода';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000) {
            level.textContent = 'Средний уровень дохода';
        } else if (appData.moneyPerDay > 2000) {
            level.textContent = 'Высокий уровень дохода';
        } else {
            level.textContent = 'ошибка';
        }
    } else {
        daybudget.textContent = 'Произошла ошибка';
    }
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthsavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthsavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    expenses:{},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: {}
};