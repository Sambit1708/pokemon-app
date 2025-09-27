import { Box, Card, CardMedia } from "@mui/material";
import PokemonList from "./pokemonlist/pokemonlist";

export default function Home() {
  return (
    <div style={{background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', height: '100vh'}}>
      <Box>
        {/* <Card sx={{width: 275}}>
          <CardMedia
            component="img"
            height="194"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/5.png"
            alt="Paella dish"
          />
        </Card> */}
        <PokemonList />
      </Box>
    </div>
  );
}
