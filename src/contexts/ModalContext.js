import React from "react";

const ModalContext = React.createContext();

export class ModalContextProvider extends React.Component{

    state = {
        show: false,
        title: null,
        content: null,
        footer: null
    };

    toggleModal = () => this.setState({...this.state, show: !this.state.show});
    setModalContent = content => this.setState({...this.state, ...content});

    render() {
        return (
            <ModalContext.Provider value={{
                ...this.state,
                toggleModal: this.toggleModal,
                setModalContent: this.setModalContent,
            }}>
                {this.props.children}
            </ModalContext.Provider>
        );
    };
};

export default ModalContext;