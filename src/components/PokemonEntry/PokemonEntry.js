import React, {Component} from 'react';
import {Col, Modal} from "react-bootstrap";
import pokeapi from "../../api/pokeapi";
import loader from '../../img/loader.svg';
import ModalContext from "../../contexts/ModalContext";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import {Card, CardFooter, CardHeader, Thumbnail, TypeBadge} from "../StyledComponents";

export default class PokemonEntry extends Component {
    state = {loading: true};
    static contextType = ModalContext;

    componentDidMount() {
        pokeapi.get(`/pokemon/${this.props.name}/`)
            .then(({data}) =>
            {
                this.setState({...data, name: (data.name.charAt(0).toUpperCase()+data.name.slice(1)).replace("-", " ")});
            });
    }
    imageLoaded = () => this.setState({loading: false});

    handleShow = e => {
        e.preventDefault();
        const modalContent = {
            show: true,
            title: <Modal.Title><span className="text-muted">#{this.state.id}</ span> {this.state.name}</Modal.Title>,
            content: <PokemonDetails pokemon={this.state}/>,
            footer: <div className="w-100 text-center">{this.state.types.map(({type}) => <TypeBadge key={type.name} className={`type-${type.name}`}>{type.name}</TypeBadge>)}</div>
        }
        this.context.setModalContent(modalContent);
    }

    render() {
        return (
            <Col xs={6} md={4} lg={3} xl={2} className="p-2">
                <Card onClick={this.handleShow}>
                    <CardHeader>
                        <span className="text-muted">#{this.state.id}</ span> {this.state.name}
                    </CardHeader>
                    <Thumbnail
                        roundedCircle
                        src={loader}
                        className={this.state.loading?'':'d-none'} />
                    {this.state.sprites === undefined? '':
                        <Thumbnail
                            roundedCircle
                            src={this.state.sprites.front_default}
                            className={this.state.loading?'d-none':''}
                            alt={this.state.name}
                            onLoad={this.imageLoaded} />}
                    <CardFooter>
                        {this.state.sprites === undefined? '':
                            this.state.types.map(
                                ({type}) => <TypeBadge key={type.name} className={`type-${type.name}`}>{type.name}</TypeBadge>)}
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}