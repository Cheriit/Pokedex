import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap';
import ModalContext from "../../contexts/ModalContext";
import {ModalBody, ModalFooter, ModalHeader} from "../StyledComponents";

const SiteModal = () => {
    const context = useContext(ModalContext);
    return (
        <Modal show={context.show} onHide={context.toggleModal} size="md">
            <ModalHeader closeButton>{context.title}</ModalHeader>
            <ModalBody>{context.content}</ModalBody>
            <ModalFooter>{context.footer}</ModalFooter>
        </Modal>
    );
}
export default SiteModal;