import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cache: Cache ) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Failed to fetch locations");
    const data = (await resp.json()) as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocationArea(areaName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${areaName}`;
    const cached = this.cache.get<LocationArea>(url);
    if (cached) return cached;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Location area not found");
    const data = (await resp.json()) as LocationArea;
    this.cache.add(url, data);
    return data;

  }
  async fetchPokemon(name: string) {
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

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type LocationArea = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};
