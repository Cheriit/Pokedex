import React, {Component} from 'react';
import pokeapi from "../api/pokeapi";

export default class SearchBar extends Component {
    state = {
        types: [],
        selectedTypes: []
    }

    componentDidMount() {
        pokeapi.get(`/type/`)
            .then(({data}) => this.setState({...this.state, types: data.results.map(type=>type.name)}));
    }

    changeTypeState(e) {
        let selectedTypes = this.state.selectedTypes.indexOf(e.target.value) === -1 ?
            [...this.state.selectedTypes, e.target.value] :
            this.state.selectedTypes.filter(type => type !== e.target.value);
        this.props.onTypesChange(selectedTypes);
        this.setState({...this.state, selectedTypes});
    }

    render() {
        return (
            <div>
                <input onInput={e => this.props.onFormSubmit(e.target.value)} />
                {this.state.types.map(type =>  (
                    <label  key={type} >
                        <input type="checkbox" value={type} onChange={e => this.changeTypeState(e)}/>
                        {type}
                    </label>
                )
                )}
            </div>
        );
    }
}