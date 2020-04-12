import React, {Component} from 'react';
import styled from "styled-components";
import {Badge, Col, Image, Modal} from "react-bootstrap";
import pokeapi from "../api/pokeapi";
import loader from '../img/loader.svg';
import pokeball from '../img/pokeball.png';
import {DARK, LIGHT, PRIMARY_DARK, PRIMARY_LIGHT} from "../constants";
import ModalContext from "../contexts/ModalContext";

const Thumbnail = styled(Image)`
  width: 100%;
  padding: 20px;
  background: url(${pokeball})  no-repeat;
  background-size: cover; 
  image-rendering: pixelated;
`;

const Card = styled.div`
  border: 3px solid ${DARK};
  border-radius: 4px;
  background-color: ${PRIMARY_LIGHT};
  min-height: 180px;
  cursor: pointer;
`;
const CardNav = styled.div`
  width: 100%;
  background-color: ${PRIMARY_DARK};
  font-weight: 500;
`
const CardHeader = styled(CardNav)`
  text-align: center;
  border-bottom: 1px solid ${DARK};
`
const CardFooter = styled(CardNav)`
  text-align: center;
  border-top: 1px solid ${DARK};
  min-height: 30px;
`
const TypeBadge = styled(Badge)`
  color: ${LIGHT};
  padding: 5px;
  margin-left: 5px;
  margin-bottom: 3px;
`


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
            content: <Thumbnail roundedCircle  src={this.state.sprites.front_default} className={this.state.loading?'d-none':''} alt={this.state.name} onLoad={this.imageLoaded} />,
            footer: <div>{this.state.types.map(({type}) => <TypeBadge key={type.name} className={`type-${type.name}`}>{type.name}</TypeBadge>)}</div>
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
                    <Thumbnail roundedCircle  src={loader} className={this.state.loading?'':'d-none'} />
                    {this.state.sprites === undefined? '': <Thumbnail roundedCircle  src={this.state.sprites.front_default} className={this.state.loading?'d-none':''} alt={this.state.name} onLoad={this.imageLoaded} />}
                    <CardFooter>
                        {this.state.sprites === undefined? '':this.state.types.map(({type}) => <TypeBadge key={type.name} className={`type-${type.name}`}>{type.name}</TypeBadge>)}
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}