import React, {useContext} from 'react';
import PokeapiStore from "../contexts/PokeapiStore";
import {Modal, Button, Form} from 'react-bootstrap';
import TypeList from "./TypeList";
import ModalContext from "../contexts/ModalContext";

 const SearchBar = () => {
    const context = useContext(PokeapiStore);
    const modal = useContext(ModalContext);
    const modalContent = {
        show: true,
        title: <Modal.Title>Select type</Modal.Title>,
        content: <TypeList/>,
        footer: <Button variant="secondary" onClick={modal.toggleModal}>Close</Button>
    }
    const handleShow = e => { e.preventDefault(); modal.setModalContent(modalContent); }

    return (
        <Form>
            <Form.Control plaintext onInput={e => context.onFormSubmit(e.target.value)} />
            <button onClick={handleShow}>Open</button>
        </Form>
    );
}
export default SearchBar;