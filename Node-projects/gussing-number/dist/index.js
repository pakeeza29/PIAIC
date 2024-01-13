import inquirer from 'inquirer';
import chalk from 'chalk';
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function guessTheNumberGame() {
    const secretNumber = generateRandomNumber(1, 10);
    let attempts = 0;
    while (true) {
        const { guess } = await inquirer.prompt({
            type: 'input',
            name: 'guess',
            message: chalk.blue('Guess the number (between 1 and 10):'),
            validate: (input) => /^[1-9]|10$/.test(input) || chalk.red('Please enter a valid number between 1 and 10.'),
        });
        attempts++;
        const guessedNumber = parseInt(guess, 10);
        if (guessedNumber === secretNumber) {
            console.log(chalk.green(`Congratulations! You guessed the number in ${attempts} attempts.`));
            break;
        }
        else {
            console.log(chalk.yellow('Incorrect guess. Try again!'));
        }
    }
}
guessTheNumberGame();
