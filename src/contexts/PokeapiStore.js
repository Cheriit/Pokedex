import React from "react";
import {PAGINATION} from "../constants";
import pokeapi from "../api/pokeapi";

const PokeapiStore = React.createContext();

export class PokeapiStoreProvider extends React.Component{
    state = {
        pokemons: [],
        pagination: 0,
        filteredName: '',
        selectedTypes: []
    };

    componentDidMount() {
        this.onSelectedTypesChange()
            .catch((error) => console.log(error));
    }

    onPaginateSubmit = pagination => {
        if (pagination === 1)
            this.setState({...this.state, pagination: this.state.pagination + PAGINATION});
        else
            this.setState({...this.state, pagination: this.state.pagination - PAGINATION});
    };

    onFormSubmit = filteredName => {
        this.setState({...this.state, filteredName, pagination: 0});
    };

    onSelectedTypesChange = async type => {
        let selectedTypes = this.state.selectedTypes;
        if (type!=null){
            selectedTypes = selectedTypes.indexOf(type) === -1 ?
                [...selectedTypes, type] :
                selectedTypes.filter(selectedType => selectedType !== type);
        }
        if(selectedTypes.length === 0){
            const {data} = await pokeapi.get(`/pokemon?limit=10000}`);
            this.setState({
                pokemons: data.results.filter(x => {
                    let pokemon_id = x.url.split('/');
                    return pokemon_id[pokemon_id.length - 2] < 10000;
                }).map( x => x.name),
                pagination: 0,
                selectedTypes
            });
        }else{
            let pokemons = []
            for (const type of selectedTypes) {
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
                pagination: 0,
                selectedTypes
            });
        }
    };

    render() {
        return (
            <PokeapiStore.Provider value={{
                ...this.state,
                onPaginateSubmit: this.onPaginateSubmit,
                onFormSubmit: this.onFormSubmit,
                onSelectedTypesChange: this.onSelectedTypesChange,
            }}>
                {this.props.children}
            </PokeapiStore.Provider>
        );
    };
};

export default PokeapiStore;