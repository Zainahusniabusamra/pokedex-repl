import { commandCatch } from "./command_catch.js";
import { type State, type CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export function registerCommands(state: State) {
  const commands: CLICommand[] = [
    { name: "help", description: "Displays a help message", callback: async (s) => commandHelp(s) },
    { name: "exit", description: "Exit the Pokedex", callback: async (s) => commandExit(s) },
    { name: "map", description: "Display next 20 location areas", callback: commandMap },
    { name: "mapb", description: "Display previous 20 location areas", callback: commandMapb },
    { name: "explore", description: "Explore an area for Pokemon", callback: commandExplore },
{
  name: "catch",
  description: "Catch a pokemon",
  callback: commandCatch,
},

  ];
  commands.forEach((cmd) => (state.commands[cmd.name] = cmd));
}
