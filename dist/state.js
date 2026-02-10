import { createInterface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
export function initState() {
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
