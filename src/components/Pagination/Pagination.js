import React, {useContext} from 'react';
import {PAGINATION} from "../../constants";
import PokeapiStore from "../../contexts/PokeapiStore";
import {Col, Row} from "react-bootstrap";
import {SiteButton} from "../StyledComponents";

const Pagination = ({pokemons}) => {
    const context = useContext(PokeapiStore);
    return (
        <Row noGutters>
            <Col md={{span:3}} className="text-left pl-2">
                {context.pagination !== 0?
                    <SiteButton onClick={() => context.onPaginateSubmit(-1)} className="w-100">&lt;&lt; Prev</SiteButton>:''}
            </Col>
            <Col md={{span:3, offset:6}}  className="text-right pr-2">
                {context.pagination + PAGINATION < pokemons.length-1?
                    <SiteButton onClick={() => context.onPaginateSubmit(1)} className="w-100">Next &gt;&gt;</SiteButton>:''}
            </Col>
        </Row>
    );
};
export default Pagination;
