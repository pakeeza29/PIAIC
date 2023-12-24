import promptUser from 'inquirer';
import chalk from 'chalk';

interface CalculatorOptions {
  num1: string;
  operations: ('Add' | 'Subtract' | 'Multiply' | 'Divide')[];
  num2: string;
}

async function calculator() {
  console.log(chalk.bold.magentaBright('   ┌───────────────────────┐'));
  console.log(chalk.bold.magentaBright('   │   Simple Calculator   │'));
  console.log(chalk.bold.magentaBright('   └───────────────────────┘\n'));

  const questions = [
    {
      type: 'input',
      name: 'num1',
      message: chalk.magentaBright('Enter the first number:'),
      validate: (input: string) => !isNaN(parseFloat(input)) || chalk.red('Please enter a valid number'),
    },
    {
      type: 'checkbox',
      name: 'operations',
      message: chalk.blueBright('Select operations:'),
      choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
      validate: (input: string[]) => input.length > 0 || chalk.red('Please select at least one operation'),
    },
    {
      type: 'input',
      name: 'num2',
      message: chalk.cyanBright('Enter the second number:'),
      validate: (input: string) => !isNaN(parseFloat(input)) || chalk.red('Please enter a valid number'),
    },
  ];

  const answers: CalculatorOptions = await promptUser.prompt(questions);

  const num1 = parseFloat(answers.num1);
  const num2 = parseFloat(answers.num2);

  console.log(chalk.bold.magentaBright('   ┌───────────────────────┐'));
  answers.operations.forEach((operation) => {
    let result: number;

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
}

calculator();
