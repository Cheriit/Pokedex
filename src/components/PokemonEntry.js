import React, {Component} from 'react';
import {Loader} from "./Loader";
import pokeapi from "../api/pokeapi";

export default class PokemonEntry extends Component {
    state = {}
    componentDidMount() {
        pokeapi.get(`/pokemon/${this.props.name}/`)
            .then(({data}) =>
            {
                this.setState({...data, name: (data.name.charAt(0).toUpperCase()+data.name.slice(1)).replace("-", " ")});
            });
    }
    render() {
        if (this.state.is_default){
            return (
                <div>
                    {this.state.sprites === undefined?
                        <Loader />:
                        <img src={this.state.sprites.front_default} alt={this.state.name}  />}
                    {this.state.name}
                </div>
            );
        }else{
            return (
                <div>
                    {this.state.name}
                </div>
            );

        }
    }
}