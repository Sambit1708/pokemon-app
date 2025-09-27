"use client";
import React, { useEffect, useState } from "react";
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

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });
const typeColors: Record<string, string> = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Grass: "#7AC74C",
  Electric: "#F7D02C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Fairy: "#D685AD",
};

const pastelColors = [
  "#FFD1DC",
  "#C1F0F6",
  "#FEE1A8",
  "#C1E1C1",
  "#E6C9E0",
  "#FFE3E3",
  "#D1F5E0",
  "#FCE1A8",
  "#D1C4E9",
  "#B2EBF2",
];

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await new PokemonAPIService().getPokemonList();
        setPokemons(data);
      } catch (err) {
        setError("Failed to load Pokémon.");
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
  const [ searchText, setSearchText ] = useState("");
  const [ open, setOpen ] = useState(false);
  const [ pokemon, setPokemon ] = useState({} as Pokemons);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleClickOpen = (pokemonVal: Pokemons) => {
    setOpen(true);
    setPokemon(pokemonVal);
  };

  const handleClose = (value: string) => {
    setOpen(false);
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
            {pokemons
              .filter((item, i) =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, i) => (
                <Card
                  key={i}
                  onClick={() => handleClickOpen(item)}
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
                      image={item.sprites.official_artwork}
                      alt={item.name}
                      sx={{
                        padding: 1,
                        bgcolor: typeColors[CommonUtils.capitalizeFirstLetter(item.types[0])] || pastelColors[i % pastelColors.length],
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: 2, paddingTop: 2 }}>
                    <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: "gray", fontSize: 12 }}>
                      {item.types.join(", ")}
                    </Typography>
                  </Box>
                </Card>
              ))}
          </Box>
        </Card>
      </div>
      <PokemonDialog
        index={pokemons.indexOf(pokemon) + 1}
        pokemon={pokemon}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
