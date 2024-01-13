var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// index.ts
import inquirer from 'inquirer';
import chalk from 'chalk';
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function guessTheNumberGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const secretNumber = generateRandomNumber(1, 10);
        let attempts = 0;
        while (true) {
            const { guess } = yield inquirer.prompt({
                type: 'input',
                name: 'guess',
                message: 'Guess the number (between 1 and 10):',
                validate: (input) => /^[1-9]|10$/.test(input) || 'Please enter a valid number between 1 and 10.',
            });
            attempts++;
            const guessedNumber = parseInt(guess, 10);
            if (guessedNumber === secretNumber) {
                console.log(chalk.green(`Congratulations! You guessed the number in ${attempts} attempts.`));
                break;
            }
            else {
                console.log(chalk.red('Incorrect guess. Try again!'));
            }
        }
    });
}
guessTheNumberGame();
