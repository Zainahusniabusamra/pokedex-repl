import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startREPL() {
  rl.question('> ', (input: string) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    console.log('You typed:', input);

    startREPL();
  });
}

startREPL();

