import database from './../database.json';
import Person from './person.js';
import TerminalController from './terminalController.js';
import { save } from './repository.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question(': ');

    if (answer === STOP_TERM) {
      console.log('process killed!!!');
      terminalController.closeTerminal();
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    // console.log('person', person.formatted(DEFAULT_LANG));
    terminalController.updatetable(person.formatted(DEFAULT_LANG));
    await save(person);

    return mainLoop();
  } catch (err) {
    console.log('vish...', err);
    return mainLoop();
  }
}

await mainLoop();
