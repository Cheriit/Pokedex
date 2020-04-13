import React, {useContext} from 'react';

import ModalContext from "../../contexts/ModalContext";

import {SiteButton, FormRow} from "../StyledComponents";
import {Modal, Col} from 'react-bootstrap';

import TypesCheckboxList from "../TypesCheckboxList/TypesCheckboxList";
import NameInput from "../NameInput/NameInput";

 const SearchBar = () => {
    const modal = useContext(ModalContext);
    const modalContent = {
        show: true,
        title: <Modal.Title>Select type</Modal.Title>,
        content: <TypesCheckboxList/>,
        footer: <SiteButton variant="secondary" onClick={modal.toggleModal}>Close</SiteButton>
    }
    const handleShow = e => { e.preventDefault(); modal.setModalContent(modalContent); }

    return (
        <FormRow noGutters>
            <Col md={9} className="pr-md-3">
                <NameInput />
            </Col>
            <Col md={3} className="pt-2 pt-md-0 text-center">
                <SiteButton className="w-100" onClick={handleShow}>Types</SiteButton>
            </Col>
        </FormRow>
    );
}
export default SearchBar;