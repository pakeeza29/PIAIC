var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import promptUser from 'inquirer';
import chalk from 'chalk';
function calculator() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.bold.magentaBright('   ┌───────────────────────┐'));
        console.log(chalk.bold.magentaBright('   │   Simple Calculator   │'));
        console.log(chalk.bold.magentaBright('   └───────────────────────┘\n'));
        const questions = [
            {
                type: 'input',
                name: 'num1',
                message: chalk.magentaBright('Enter the first number:'),
                validate: (input) => !isNaN(parseFloat(input)) || chalk.red('Please enter a valid number'),
            },
            {
                type: 'checkbox',
                name: 'operations',
                message: chalk.blueBright('Select operations:'),
                choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
                validate: (input) => input.length > 0 || chalk.red('Please select at least one operation'),
            },
            {
                type: 'input',
                name: 'num2',
                message: chalk.cyanBright('Enter the second number:'),
                validate: (input) => !isNaN(parseFloat(input)) || chalk.red('Please enter a valid number'),
            },
        ];
        const answers = yield promptUser.prompt(questions);
        const num1 = parseFloat(answers.num1);
        const num2 = parseFloat(answers.num2);
        console.log(chalk.bold.magentaBright('   ┌───────────────────────┐'));
        answers.operations.forEach((operation) => {
            let result;
            switch (operation) {
                case 'Add':
                    result = num1 + num2;
                    console.log(chalk.bold.magenta(`   │   Result (Add): ${result}`));
                    break;
                case 'Subtract':
                    result = num1 - num2;
                    console.log(chalk.bold.blue(`   │   Result (Subtract): ${result}`));
                    break;
                case 'Multiply':
                    result = num1 * num2;
                    console.log(chalk.bold.yellow(`   │   Result (Multiply): ${result}`));
                    break;
                case 'Divide':
                    result = num2 !== 0 ? num1 / num2 : NaN;
                    console.log(chalk.bold.red(`   │   Result (Divide): ${result}`));
                    break;
                default:
                    throw new Error('Invalid operation');
            }
        });
        console.log(chalk.bold.magentaBright('   └───────────────────────┘'));
    });
}
calculator();
