import inquirer from 'inquirer';
import chalk from 'chalk';
const generateRandomUserData = () => ({
    userId: 29,
    userPin: 29,
    balance: Math.floor(Math.random() * 1000),
});
const userData = generateRandomUserData();
const authenticateUser = () => {
    return new Promise((resolve) => {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'userId',
                message: 'Enter your user id:',
            },
            {
                type: 'input',
                name: 'userPin',
                message: 'Enter your pin:',
            },
        ])
            .then((answers) => {
            const { userId, userPin } = answers;
            const isUserAuthenticated = userId === userData.userId.toString() && userPin === userData.userPin.toString();
            resolve(isUserAuthenticated);
        })
            .catch((error) => {
            console.error(chalk.red('Error during authentication:', error.message));
            resolve(false);
        });
    });
};
const displayATMMenu = () => {
    return new Promise((resolve) => {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Balance Inquiry', 'Withdrawal', 'Deposit', 'Exit'],
            },
        ])
            .then((answers) => {
            resolve(answers.action);
        });
    });
};
const performBalanceInquiry = () => {
    console.log(chalk.blue(`Your balance is $${userData.balance}`));
};
const performWithdrawal = () => {
    return new Promise(async (resolve) => {
        const withdrawalAmountResponse = await inquirer.prompt([
            {
                type: 'input',
                name: 'withdrawalAmount',
                message: 'Enter the withdrawal amount:',
                validate: (input) => {
                    const amount = parseFloat(input);
                    return !isNaN(amount) && amount > 0 && amount <= userData.balance
                        ? true
                        : 'Please enter a valid withdrawal amount within your balance.';
                },
            },
        ]);
        const withdrawalAmount = parseFloat(withdrawalAmountResponse.withdrawalAmount);
        userData.balance -= withdrawalAmount;
        console.log(chalk.green(`Withdrawal successful! New balance is $${userData.balance}`));
        resolve();
    });
};
const performDeposit = () => {
    return new Promise(async (resolve) => {
        const depositAmountResponse = await inquirer.prompt([
            {
                type: 'input',
                name: 'depositAmount',
                message: 'Enter the deposit amount:',
                validate: (input) => {
                    const amount = parseFloat(input);
                    return !isNaN(amount) && amount > 0 ? true : 'Please enter a valid deposit amount.';
                },
            },
        ]);
        const depositAmount = parseFloat(depositAmountResponse.depositAmount);
        userData.balance += depositAmount;
        console.log(chalk.green(`Deposit successful! New balance is $${userData.balance}`));
        resolve();
    });
};
const startATM = async () => {
    console.log(chalk.green('Welcome to the ATM!'));
    const isAuthenticated = await authenticateUser();
    if (isAuthenticated) {
        console.log(chalk.green('Authentication successful! ATM functionalities unlocked.'));
        while (true) {
            const selectedAction = await displayATMMenu();
            switch (selectedAction) {
                case 'Balance Inquiry':
                    performBalanceInquiry();
                    break;
                case 'Withdrawal':
                    await performWithdrawal();
                    break;
                case 'Deposit':
                    await performDeposit();
                    break;
                case 'Exit':
                    console.log(chalk.green('Exiting ATM. Have a great day!'));
                    process.exit(0);
                    break;
            }
        }
    }
    else {
        console.log(chalk.red('Authentication failed. Exiting.'));
    }
};
// Start the ATM application
startATM();
