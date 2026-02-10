export class PokeAPI {
    constructor(cache) {
        this.cache = cache;
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const resp = await fetch(url);
        if (!resp.ok)
            throw new Error("Failed to fetch locations");
        const data = (await resp.json());
        this.cache.add(url, data);
        return data;
    }
    async fetchLocationArea(areaName) {
        const url = `${PokeAPI.baseURL}/location-area/${areaName}`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const resp = await fetch(url);
        if (!resp.ok)
            throw new Error("Location area not found");
        const data = (await resp.json());
        this.cache.add(url, data);
        return data;
    }
    async fetchPokemon(name) {
        const url = `${PokeAPI.baseURL}/pokemon/${name}`;
        const cached = this.cache.get(url);
        if (cached) {
            console.log(`💾 Using cached data for ${url}`);
            return cached;
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Pokemon not found");
        }
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
}
PokeAPI.baseURL = "https://pokeapi.co/api/v2";
