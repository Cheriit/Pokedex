import React, {useContext} from 'react';
import styled from "styled-components";
import {Modal} from 'react-bootstrap';
import ModalContext from "../contexts/ModalContext";
import {DARK, PRIMARY_DARK, PRIMARY_LIGHT} from "../constants";

const ModalBody = styled(Modal.Body)`
  border-radius: 4px;
  background-color: ${PRIMARY_LIGHT};
`

const ModalHeader = styled(Modal.Header)`
  border-bottom: 1px solid ${DARK};
  background-color: ${PRIMARY_DARK};
  font-weight: 500;
`

const ModalFooter = styled(Modal.Footer)`
  border-top: 1px solid ${DARK};
  background-color: ${PRIMARY_DARK};
  font-weight: 500;
`

const SiteModal = () => {
    const context = useContext(ModalContext);
    console.log(context)
    return (
        <Modal show={context.show} onHide={context.toggleModal}>
            <ModalHeader closeButton>{context.title}</ModalHeader>
            <ModalBody>{context.content}</ModalBody>
            <ModalFooter>{context.footer}</ModalFooter>
        </Modal>
    );
}
export default SiteModal;