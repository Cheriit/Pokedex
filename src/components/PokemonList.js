import React from 'react';
import PokemonEntry from "./PokemonEntry";

const PokemonList = ({pokemons}) => {
    const renderedList = pokemons.map(pokemon => <PokemonEntry key={pokemon} name={pokemon} />);
    return pokemons.length?renderedList:<h1>Nie znaleziono pokemonów spełniających wymagania</h1>;
};
export default PokemonList;
