import styled, {createGlobalStyle} from "styled-components";
import {Badge, Button, FormControl, Image, Modal, Row} from "react-bootstrap";

import {DARK, LIGHT, PRIMARY_DARK, PRIMARY_LIGHT} from "../constants";

import pokeball from "../img/pokeball.png";
import BackgroundDay from "../img/background-day.jpg";
import BackgroundNight from "../img/background-night.jpg";

const Global = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0;
    cursor: default;
    scroll-behavior: smooth;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    color: ${DARK};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url(${(new Date()).getHours()>=18 || (new Date()).getHours()<=7?BackgroundNight: BackgroundDay});
    background-position: center center;
    background-size: cover; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
  }
  body::-webkit-scrollbar {
    width: 1em;
  }
   
  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: ${PRIMARY_LIGHT};
  }
   
  body::-webkit-scrollbar-thumb {
    background-color: ${PRIMARY_DARK};
    outline: 1px solid slategrey;
  }
  
`;

const Thumbnail = styled(Image)`
  width: 100%;
  padding: 20px;
  background: url(${pokeball})  no-repeat;
  background-size: cover; 
  image-rendering: pixelated;
`;

const SiteButton = styled(Button)`
  max-width: 95%;
  border: 3px solid ${DARK}!important;
`
const Checkbox =  styled.input.attrs({ type: 'checkbox' })`
  display: none;
`
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
`;
const CardHeader = styled(CardNav)`
  text-align: center;
  border-bottom: 1px solid ${DARK};
`;
const CardFooter = styled(CardNav)`
  text-align: center;
  border-top: 1px solid ${DARK};
  min-height: 30px;
`;
const TypeBadge = styled(Badge)`
  text-transform: uppercase;
  color: ${LIGHT};
  padding: 5px;
  margin: 3px 5px;
`;
const StatContainer = styled.div`
  text-transform: capitalize;
   clear: both;
   width: 100%;
`;
const FormRow = styled(Row)`
  padding: 30px 10px;
`
const Input = styled(FormControl)`
  background-color: ${PRIMARY_DARK};
  border: 3px solid ${DARK};
  border-radius: 5px;
  padding-left: 10px;
  color: ${DARK}
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: 1px solid ${DARK};
  background-color: ${PRIMARY_DARK};
  font-weight: 500;
`

const ModalBody = styled(Modal.Body)`
  border-radius: 4px;
  background-color: ${PRIMARY_LIGHT};
`

const ModalFooter = styled(Modal.Footer)`
  border-top: 1px solid ${DARK};
  background-color: ${PRIMARY_DARK};
  font-weight: 500;
`

export {
    Global,
    Thumbnail,
    SiteButton,
    Checkbox,
    Input,
    Card,
    CardNav,
    CardHeader,
    CardFooter,
    TypeBadge,
    StatContainer,
    FormRow,
    ModalHeader,
    ModalBody,
    ModalFooter
};