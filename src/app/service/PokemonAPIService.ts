import API from "./axios";

export interface Stats {
    name: string;
    base_stat: number;
}

export interface Sprites {
    front_default: string;
    back_default: string;
    official_artwork: string;
}

export interface Pokemons {
    id: number;
    name: string;
    types: string[];
    region: string;
    weaknesses: string[];
    sprites: Sprites;
    height: number;
    weight: number;
    stats: Stats[];
}

const POKEMON_BASE_API = "/api/v1/pokemon"

export class PokemonAPIService {
  async getPokemonList(): Promise<Pokemons[]> {
    try {
      const response = await API.get<Pokemons[]>(POKEMON_BASE_API);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch pokemon list", error);
      return [];
    }
  }

  async getPokemonDetail(id: number): Promise<Pokemons> {
    try {
      const response = await API.get<Pokemons>(POKEMON_BASE_API + `/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch pokemon list", error);
      return {} as Pokemons;
    }
  }
}