import React, {useContext} from 'react';
import PokemonEntry from "../PokemonEntry/PokemonEntry";
import Pagination from "../Pagination/Pagination";
import {PAGINATION} from "../../constants";
import PokeapiStore from "../../contexts/PokeapiStore";
import {Row} from "react-bootstrap";

const PokemonList = () => {

    const context = useContext(PokeapiStore);

    let end = Math.min(context.pagination + PAGINATION, context.pokemons.length);
    const filteredList = context.pokemons
        .filter(pokemon =>
            context.filteredName!==''?
                pokemon.toLowerCase().trim().includes(context.filteredName.toLowerCase().trim()):
                true);

    return (
        <div>
            <Row noGutters>
                {
                    filteredList.length?
                    filteredList.slice(context.pagination, end).map(pokemon => <PokemonEntry key={pokemon} name={pokemon} />):
                    <h1 className="text-center w-100">Nie znaleziono pokemonów spełniających wymagania</h1>
                }
            </Row>
            <Pagination pokemons={filteredList}/>
        </div>

    );
};
export default PokemonList;
