import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  pokeapi: PokeAPI;
  commands: { [key: string]: CLICommand };
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, any>;
};

export function initState(): State {
  const cache = new Cache(300000);
  return {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    pokeapi: new PokeAPI(cache),
    commands: {},
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {}, 
 };
}
