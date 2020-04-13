import React, {Component} from "react";
import PokeapiStore from "../../contexts/PokeapiStore";
import pokeapi from "../../api/pokeapi";
import {Checkbox, TypeBadge} from "../StyledComponents";
import {Row} from "react-bootstrap";

export default class TypesCheckboxList extends Component {
    static contextType = PokeapiStore;
    state = {
        types: []
    }

    missedTypes = ['shadow']
    componentDidMount() {
        pokeapi.get(`/type/`)
            .then(({data}) => this.setState({...this.state, types: data.results.map(type=>type.name)}));
    }

    render() {
        return (
            <Row noGutters>
                {this.state.types.filter(type => this.missedTypes.indexOf(type) === -1).map(type =>  (
                        <label key={type} className={'col-12 col-sm-6 col-md-4 pr-3'} >
                            <TypeBadge className={`w-100 type-${type} ${this.context.selectedTypes.indexOf(type) === -1?'bg-secondary':''}`}>{type}</TypeBadge>
                            <Checkbox
                                value={type}
                                defaultChecked={this.context.selectedTypes.indexOf(type) !== -1}
                                onChange={e => this.context.onSelectedTypesChange(e.target.value)}/>
                        </label>
                    )
                )}
            </Row>
        );
    }
}