import React, {Component} from 'react';
import {createGlobalStyle} from "styled-components";
import PokemonSolid from './fonts/PokemonSolid.ttf';
import PokemonHollow from './fonts/PokemonHollow.ttf';
import pokeapi from "./api/pokeapi";
import './styles/App.scss';
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import {PAGINATION} from "./constants";

const Global = createGlobalStyle`
  @font-face {
      font-family: 'PokemonSolid';
      src: url(${PokemonSolid}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  @font-face {
      font-family: 'PokemonHollow';
      src: url(${PokemonHollow}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

  body {
    overflow-x: hidden;
    margin: 0;
    cursor: default;
    scroll-behavior: smooth;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
  }
  body::-webkit-scrollbar {
    width: 1em;
  }
   
  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
   
  body::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

export default class App extends Component{

    state = {
        pokemons: [],
        pagination: 0,
        filteredName: ''
    };

    componentDidMount(){
        this.onTypesChange([]);
    };

    onPaginateSubmit = pagination => {
        if (pagination === 1)
            this.setState({...this.state, pagination: this.state.pagination + PAGINATION});
        else
            this.setState({...this.state, pagination: this.state.pagination - PAGINATION});
    };

    onFormSubmit = filteredName => {
        this.setState({...this.state, filteredName, pagination: 0});
    };

    onTypesChange = async types => {
        if(types.length === 0){
            const {data} = await pokeapi.get(`/pokemon?limit=10000}`);
                this.setState({
                pokemons: data.results.filter(x => {
                    let pokemon_id = x.url.split('/');
                    return pokemon_id[pokemon_id.length - 2] < 10000;
                }).map( x => x.name),
                pagination: 0
            });
        }else{
            let pokemons = []
            for (const type of types) {
                const {data} = await pokeapi.get(`/type/${type}/`);
                data.pokemon
                    .map(x => {
                        let pokemon_id = x.pokemon.url.split('/');
                        pokemon_id = pokemon_id[pokemon_id.length - 2]
                        return { name: x.pokemon.name, id: parseInt(pokemon_id) }
                    })
                   .filter(x => x.id < 10000)
                   //eslint-disable-next-line
                   .forEach(x => pokemons.push(x))
            }
            pokemons = pokemons
                .sort((a, b) => a.id > b.id? 1: -1)
                .map(x => x.name);

            this.setState({
                pokemons: [...new Set(pokemons)],
                pagination: 0
            });
        }
    };

    filterList(){
        let end = Math.min(this.state.pagination + PAGINATION, this.state.pokemons.length);
        return this.state.pokemons
            .filter(pokemon =>
                this.state.filteredName!==''?
                pokemon.toLowerCase().trim().includes(this.state.filteredName.toLowerCase().trim()):
                true)
            .slice(this.state.pagination, end);
    }

    render() {
        const filteredList = this.filterList();
        return(
            <div className="App">
                <Global/>
                <SearchBar
                    onFormSubmit = {this.onFormSubmit}
                    onTypesChange = {this.onTypesChange}
                />
                <PokemonList
                    pokemons = {filteredList}
                />
                <Pagination
                    pagination = {this.state.pagination}
                    max_pagination = {this.state.pokemons.length-1}
                    onPaginateSubmit = {this.onPaginateSubmit}
                />
            </div>
        );
    }
}