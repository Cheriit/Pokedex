import React, {useContext} from 'react';
import {PAGINATION} from "../constants";
import PokeapiStore from "../contexts/PokeapiStore";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";

const Pagination = ({pokemons}) => {
    const context = useContext(PokeapiStore);
    console.log(pokemons.length)
    return (
        <Row noGutters>
            <Col >
                {context.pagination !== 0?<Button onClick={() => context.onPaginateSubmit(-1)} className="w-50">Prev</Button>:''}
            </Col>
            <Col>
                {context.pagination + PAGINATION < pokemons.length-1?<Button onClick={() => context.onPaginateSubmit(1)} className="w-50">Next</Button>:''}
            </Col>
        </Row>
    );
};
export default Pagination;
