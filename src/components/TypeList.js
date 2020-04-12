import React, {Component} from "react";
import PokeapiStore from "../contexts/PokeapiStore";
import pokeapi from "../api/pokeapi";

export default class TypeList extends Component {
    static contextType = PokeapiStore;
    state = {
        types: []
    }

    componentDidMount() {
        pokeapi.get(`/type/`)
            .then(({data}) => this.setState({...this.state, types: data.results.map(type=>type.name)}));
    }

    render() {
        return (
            <div>
                {this.state.types.map(type =>  (
                        <label  key={type} >
                            <input type="checkbox" value={type} defaultChecked={this.context.selectedTypes.indexOf(type) !== -1} onChange={e => this.context.onSelectedTypesChange(e.target.value)}/>
                            {type}
                        </label>
                    )
                )}
            </div>
        );
    }
}