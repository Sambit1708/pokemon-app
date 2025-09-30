import API from "./axios";

export interface Stats {
    name: string;
    base_stat: number;
}

export interface Sprites {
    frontDefault: string;
    backDefault: string;
    officialArtwork: string;
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

interface ApiResponse<T> {
  data: T;
  responseMessage: string;
  responseCode: string;
  httpStatus: string;
}

export class PokemonAPIService {
  async getPokemonList(limit: number, offset: number): Promise<Pokemons[]> {
    try {
      const response = await API.get<ApiResponse<Pokemons[]>>(POKEMON_BASE_API+ `?limit=${limit}&offset=${offset}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Failed to fetch pokemon list", error);
      throw new Error("Unable to load Pokémon list. Please try again later.");
    }
  }

  async getPokemonDetail(id: number): Promise<Pokemons | null> {
    try {
      const response = await API.get<ApiResponse<Pokemons>>(POKEMON_BASE_API + `/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Failed to fetch pokemon detail for ID ${id}`, error);
      throw new Error(`Unable to load Pokémon details for ID ${id}.`);
    }
  }
}