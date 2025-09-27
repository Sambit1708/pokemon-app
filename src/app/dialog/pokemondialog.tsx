"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Card, CardMedia, Grid, Paper } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PokemonAPIService, Pokemons } from "../service/PokemonAPIService";
import { CommonUtils } from "../common/common";

const b1Style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30%", // a bit smaller to give more room to right
  height: "100%",
  background: "#FF6D2D",
  color: "black",
  boxSizing: "border-box",
};

const b2Style = {
  width: "70%", // more space for right side
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  background: "#000",
  alignItems: "center",
  justifyContent: "space-around",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

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

export interface PokemonDialogProps {
  open: boolean;
  pokemon: Pokemons;
  index: number;
  onClose: (value: string) => void;
}

export default function PokemonDialog(props: PokemonDialogProps) {
  const { onClose, open, pokemon, index } = props;
  const [value, setValue] = useState("1");

  const handleChange = (sign: "+" | "-") => {
    const num = parseInt(value, 10);
    const max = 3;
    const min = 1;

    setValue(
      (((num - min + (sign === "+" ? 1 : -1) + max) % max) + min).toString()
    );
  };

  const handleClose = () => {
    onClose(open ? value : "1");
    setValue("1");
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={{ maxWidth: 750, minHeight: 200, minWidth: 500 }}>
        <Box
          sx={{
            display: "flex",
            borderRadius: 1,
            marginBottom: 2,
            width: "100%",
            height: "60px",
            boxSizing: "border-box",
          }}
        >
          <Box sx={b1Style}>
            <CatchingPokemonIcon sx={{ bgcolor: "FF6D2D", color: "white" }} />
            <Typography
              fontFamily="500"
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingLeft: 1,
                fontFamily: "Poppins",
              }}
            >
              {"No "+ index}
            </Typography>
          </Box>
          <Box sx={b2Style}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 0.6,
                fontFamily: "Poppins",
              }}
            >
              {pokemon.name}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              marginBottom: 2,
              typography: "body1",
              position: "relative",
            }}
          >
            <TabContext value={value}>
              <Box>
                <Box
                  onClick={() => handleChange("-")}
                  sx={{
                    position: "absolute",
                    top: 100,
                    left: 8,
                    cursor: "pointer",
                    borderRadius: "50%",
                    bgcolor: "#f5f5f5",
                    padding: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    "&:active": {
                      transform: "translateY(1px)", // push down effect
                      boxShadow: 1, // reduce shadow
                    },
                  }}
                >
                  <ArrowBackIcon sx={{ color: "grey" }} />
                </Box>
                <Box
                  onClick={() => handleChange("+")}
                  sx={{
                    position: "absolute",
                    top: 100,
                    right: 8,
                    cursor: "pointer",
                    borderRadius: "50%",
                    bgcolor: "#f5f5f5",
                    padding: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    "&:active": {
                      transform: "translateY(1px)", // push down effect
                      boxShadow: 1, // reduce shadow
                    },
                  }}
                >
                  <ArrowForwardIcon sx={{ color: "grey" }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TabPanel value="1">
                  <CardMedia
                    component="img"
                    image={pokemon?.sprites?.official_artwork || ""}
                    alt={pokemon?.name || "Pokemon"}
                    sx={{
                      bgcolor: typeColors[CommonUtils.capitalizeFirstLetter(pokemon?.types?.at(0) || "Normal")] || "#f7f7f7",
                      width: 200,
                      padding: 1,
                      borderRadius: 2,
                    }}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <CardMedia
                    component="img"
                    image={pokemon?.sprites?.front_default || ""}
                    alt={pokemon?.name || "Pokemon"}
                    sx={{
                      width: 200,
                      padding: 1,
                      bgcolor: typeColors[CommonUtils.capitalizeFirstLetter(pokemon?.types?.at(0) || "Normal")] || "#f7f7f7",
                      borderRadius: 2,
                    }}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <CardMedia
                    component="img"
                    image={pokemon?.sprites?.back_default || ""}
                    alt={pokemon?.name || "Pokemon"}
                    sx={{
                      width: 200,
                      padding: 1,
                      bgcolor: typeColors[CommonUtils.capitalizeFirstLetter(pokemon?.types?.at(0) || "Normal")] || "#f7f7f7",
                      borderRadius: 2,
                    }}
                  />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
          <Box sx={{ marginBottom: 2, paddingX: 3 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Typography fontWeight={600} color="#333" sx={{ width: "40%", fontFamily: "Poppins" }}>
                  Height
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography color="#555" sx={{ textAlign: "left", fontFamily: "Poppins" }}>
                  {pokemon?.height || 0} m
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontWeight={600} color="#333" sx={{ width: "40%", fontFamily: "Poppins" }}>
                  Weight
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography color="#555" sx={{ textAlign: "left", fontFamily: "Poppins" }}>
                  {pokemon?.weight || 0} kg
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontWeight={600} color="#333" sx={{ width: "40%", fontFamily: "Poppins" }}>
                  Region
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography color="#555" sx={{ textAlign: "left", fontFamily: "Poppins" }}>
                  {pokemon?.region || ""}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontWeight={600} color="#333" sx={{ width: "40%", fontFamily: "Poppins" }}>
                  Type
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography color="#555" sx={{ textAlign: "left", fontFamily: "Poppins" }}>
                  {pokemon?.types?.join(", ") || ""}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontWeight={600} color="#333" sx={{ width: "40%", fontFamily: "Poppins" }}>
                  Weakness
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography color="#555" sx={{ textAlign: "left", fontFamily: "Poppins" }}>
                  {pokemon?.weaknesses?.join(", ") || ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
