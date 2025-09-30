"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Poppins } from "next/font/google";
import SearchIcon from "@mui/icons-material/Search";
import PokemonDialog from "../dialog/pokemondialog";
import { PokemonAPIService, Pokemons } from "../service/PokemonAPIService";
import { CommonUtils } from "../common/common";
import { pastelColors, typeColors } from "../common/colors";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });


export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await new PokemonAPIService().getPokemonList(100, 0);
        setPokemons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pokemons, loading, error };
};

export default function PokemonList() {
  const { pokemons, loading, error } = usePokemons();
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [pokemons, searchText]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleClickOpen = (pokemon: Pokemons) => {
    setOpen(true);
    setSelectedPokemon(pokemon);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingTop: 20,
        }}
      >
        <Card
          sx={{
            width: 1450,
            height: "600px",
            bgcolor: "#F5F5F5",
            borderRadius: 5,
            cursor: "pointer",
            overflowY: "auto",
            overflowX: "hidden",
            padding: 2,
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Pokémon..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 3,
              padding: 2,
            }}
          >
            {filteredPokemons
              .map((pokemon) => (
                <Card
                  key={pokemon.id}
                  onClick={() => handleClickOpen(pokemon)}
                  sx={{
                    width: 250,
                    height: 100,
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                    transition: "all 0.2s ease", // smooth animation
                    boxShadow: 3, // default shadow

                    "&:active": {
                      transform: "translateY(4px)", // push down effect
                      boxShadow: 1, // reduce shadow
                    },
                  }}
                >
                  <Box sx={{ width: 100, height: 100 }}>
                    <CardMedia
                      component="img"
                      height="80"
                      image={pokemon.sprites.officialArtwork}
                      alt={pokemon.name}
                      sx={{
                          padding: 1,
                          bgcolor: typeColors[CommonUtils.capitalizeFirstLetter(pokemon.types[0])] || 
                                pastelColors[pokemon.id % pastelColors.length],
                          borderRadius: 2,
                        }}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: 2, paddingTop: 2 }}>
                    <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
                      {pokemon.name}
                    </Typography>
                    <Typography sx={{ color: "gray", fontSize: 12 }}>
                      {pokemon.types.join(", ")}
                    </Typography>
                  </Box>
                </Card>
              ))}
          </Box>
        </Card>
      </div>
       {selectedPokemon && (
        <PokemonDialog
          index={pokemons.findIndex(p => p.id === selectedPokemon.id) + 1}
          pokemon={selectedPokemon}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
