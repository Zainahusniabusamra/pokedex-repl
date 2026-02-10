import { initState } from "./state.js";
import { registerCommands } from "./commands.js";
import { startREPL } from "./repl.js";

async function main() {
  const state = initState();
  registerCommands(state);
  await startREPL(state);
}

main();
