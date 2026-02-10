export async function commandMapb(state, args) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    data.results.forEach((loc) => console.log(loc.name));
}
