import { type State } from "./state";
export async function commandMap(state: State, args: string[]): Promise<void> {
  const data = await state.pokeapi.fetchLocations(state.nextLocationsURL || undefined);
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
  data.results.forEach((loc) => console.log(loc.name));
}
