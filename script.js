'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Abdul Rehman',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 3131,
};

const account2 = {
    owner: 'Muhmmad Suleman',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Hania B',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Kanwal BiBi',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {

    containerMovements.innerHTML = '';

    movements.forEach(function (mov, i) {

        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}  USD</div>
            </div>
            `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    // acc.balance = balance;
    labelBalance.textContent = `${acc.balance} USD`;
};


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} USD`;

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}`;

    const interst = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interst} USD`
};



const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
};
createUsername(accounts);

const updateUI = function(acc){
        //Display Movements
        displayMovements(acc.movements);

        //Display Balance
        calcDisplayBalance(acc);

        //Display Summery
        calcDisplaySummary(acc);
}

//Event Handler

let currentAccount;
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {

        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;

        containerApp.style.opacity = 100;

        //Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();


        //updateUI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 &&
            receiverAcc &&
            currentAccount.balance >= amount &&
            receiverAcc?.username !==  currentAccount.username){
                
                //Doing the Transfar
                currentAccount.movements.push(-amount);
                receiverAcc.movements.push(amount);

                        
                //updateUI
                updateUI(currentAccount);
            }
});


btnLoan.addEventListener('click', function(e){
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){

    }
});

btnClose.addEventListener('click', function(e){
    e.preventDefault();
 
    if(inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin){
            

            const index = accounts.findIndex(acc => acc.username === currentAccount.username);
            console.log(index);
            accounts.splice(index, 1);

            //Hide UI
            containerApp.style.opacity = 0;

        }

        inputCloseUsername.value = inputClosePin.value = '';

});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['Rs', 'Pak Ruppe'],
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);



//---------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.sort((a,b) => b-a);
console.log(movements);

const dollerToPkr = 228;

const movementsUsdToPkr = movements.map(mov => mov * dollerToPkr
);

console.log(movementsUsdToPkr);

const deposit = movements.filter(mov => mov > 0);
console.log(deposit);
const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);

const account = accounts.find(acc => acc.owner === 'Hania B');
console.log(account);

