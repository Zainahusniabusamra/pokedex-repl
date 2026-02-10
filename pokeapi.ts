import fetch from "node-fetch";
import { Cache } from "./pokecache";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  pokemon_encounters: { pokemon: { name: string } }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  public cache = new Cache(5 * 60 * 1000); 
  constructor() {}

  
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

  
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch locations");
    const data: ShallowLocations = await res.json();

    this.cache.add(url, data);
    return data;
  }

  
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    
    const cached = this.cache.get<Location>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch location");
    const data: Location = await res.json();

    this.cache.add(url, data);
    return data;
  }
}

