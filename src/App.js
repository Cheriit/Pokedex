import React, {Component} from 'react';
import {createGlobalStyle} from "styled-components";
import {Container} from "react-bootstrap";

import PokemonSolid from './fonts/PokemonSolid.ttf';
import PokemonHollow from './fonts/PokemonHollow.ttf';
import BackgroundDay from './img/background-day.jpg';

import {PokeapiStoreProvider} from "./contexts/PokeapiStore";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";
import SiteModal from "./components/SiteModal";

import './styles/App.scss';
import {ModalContextProvider} from "./contexts/ModalContext";
import {DARK} from "./constants";

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
    color: ${DARK};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url(${BackgroundDay});
    background-position: center center;
    background-size: cover; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
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