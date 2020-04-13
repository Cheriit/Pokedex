import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import {PokeapiStoreProvider} from "./contexts/PokeapiStore";
import {ModalContextProvider} from "./contexts/ModalContext";

import './styles/App.scss';

import {Global} from "./components/StyledComponents";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";
import SiteModal from "./components/SiteModal/SiteModal";



export default class App extends Component{
    render() {
        return(
            <PokeapiStoreProvider>
                <ModalContextProvider>
                    <div className="App">
                        <Global/>
                        <Container >
                            <SearchBar/>
                            <PokemonList/>
                        </Container>
                        <SiteModal/>
                    </div>
                </ModalContextProvider>
            </PokeapiStoreProvider>
        );
    }
}