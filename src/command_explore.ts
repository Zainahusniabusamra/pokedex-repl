import { type State } from "./state.js";

export async function commandExplore(state: State, args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Error: you must provide a location area name");
    return;
  }
  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);
  try {
    const area = await state.pokeapi.fetchLocationArea(areaName);
    console.log("Found Pokemon:");
    area.pokemon_encounters.forEach((e) => {
      // طباعة الاسم فقط بدون شرطة إذا كان الاختبار يتوقع ذلك
      console.log(e.pokemon.name);
    });
  } catch (err) {
    console.log("Error: could not find that location area");
  }
}
