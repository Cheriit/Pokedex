import React, {useContext} from 'react';
import {PAGINATION} from "../../constants";
import PokeapiStore from "../../contexts/PokeapiStore";
import {Col, Row} from "react-bootstrap";
import {SiteButton} from "../StyledComponents";

const Pagination = ({pokemons}) => {
    const context = useContext(PokeapiStore);
    return (
        <Row noGutters>
            <Col md={{span:3, offset:3}} className="text-left">
                {context.pagination !== 0?
                    <SiteButton onClick={() => context.onPaginateSubmit(-1)} className="w-100">Prev</SiteButton>:''}
            </Col>
            <Col md={3}  className="text-right">
                {context.pagination + PAGINATION < pokemons.length-1?
                    <SiteButton onClick={() => context.onPaginateSubmit(1)} className="w-100">Next</SiteButton>:''}
            </Col>
        </Row>
    );
};
export default Pagination;
