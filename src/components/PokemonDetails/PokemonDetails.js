import React from 'react';
import {Col, ProgressBar, Row,} from "react-bootstrap";
import {StatContainer, Thumbnail} from "../StyledComponents";

const PokemonDetails = ({pokemon}) => {
    return (
        <Row noGutters>
            <Col sm={5}>
                <Thumbnail
                    roundedCircle
                    src={pokemon.sprites.front_default}
                    className={pokemon.loading?'d-none':''}
                    alt={pokemon.name}/>
                <div className="w-50 text-center float-left">
                    <p className="h5">Height</p>
                    <p className="text-muted">{pokemon.height} ft.</p>
                </div>
                <div className="w-50 text-center float-right">
                    <p className="h5">Weight</p>
                    <p className="text-muted">{pokemon.weight} lbs.</p>
                </div>
            </Col>
            <Col sm={{ span: 6, offset: 1}}>
                <StatContainer>
                    {pokemon.stats.map(
                        ({base_stat, stat}) =>
                         (
                            <div className="w-100">
                                <div className="text-center h6">{stat.name}</div>
                                 <ProgressBar now={base_stat/2.55+8} label={`${base_stat}`}/>
                            </div>
                        )
                    )}
                </StatContainer>
            </Col>
        </Row>
    );
};
export default PokemonDetails;
