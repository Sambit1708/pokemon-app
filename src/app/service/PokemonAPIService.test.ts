import { PokemonAPIService } from "./PokemonAPIService";
import API from "./axios";

// Mock the entire axios module
jest.mock("./axios");
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe("PokemonAPIService", () => {
  let service: PokemonAPIService;

  beforeEach(() => {
    service = new PokemonAPIService();
    jest.clearAllMocks();
  });
  afterAll(() => {
    mockConsoleError.mockRestore(); // Restore original console.error after all tests
  });
  describe("getPokemonList", () => {
    it("should return pokemon list on success", async () => {
      const mockData = [{ id: 1, name: "Pikachu" }];
      (API.get as jest.Mock).mockResolvedValue({
        data: {
          data: mockData,
          responseMessage: "Data fetched successfully.",
          responseCode: "200",
          httpStatus: "OK",
        },
      });

      const result = await service.getPokemonList(10, 0);

      expect(result).toEqual(mockData);
      expect(API.get).toHaveBeenCalledWith("/api/v1/pokemon?limit=10&offset=0");
    });

    it("should throw error on failure", async () => {
      (API.get as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(service.getPokemonList(10, 0)).rejects.toThrow(
        "Unable to load Pokémon list."
      );
    });
  });

  describe("getPokemonDetail", () => {
    it("should return pokemon detail on success", async () => {
      const mockPokemon = {
        id: 1,
        name: "Pikachu",
        types: ["electric"],
        region: "Kanto",
      };
      (API.get as jest.Mock).mockResolvedValue({
        data: {
          data: mockPokemon,
          responseMessage: "Data fetched successfully.",
          responseCode: "200",
          httpStatus: "OK",
        },
      });

      const result = await service.getPokemonDetail(1);

      expect(result).toEqual(mockPokemon);
      expect(API.get).toHaveBeenCalledWith("/api/v1/pokemon/1");
    });

    it("should return null when pokemon data is null", async () => {
      (API.get as jest.Mock).mockResolvedValue({
        data: {
          data: null, // API returns null data
          responseMessage: "Pokemon not found",
          responseCode: "404",
          httpStatus: "NOT_FOUND",
        },
      });

      const result = await service.getPokemonDetail(999);

      expect(result).toBeNull(); // Now it should return null
    });

    it("should throw error when API call fails", async () => {
      (API.get as jest.Mock).mockRejectedValue(new Error("Not Found"));

      await expect(service.getPokemonDetail(999)).rejects.toThrow(
        "Unable to load Pokémon details for ID 999."
      );
    });
  });
});
