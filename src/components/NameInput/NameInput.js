import {Input} from "../StyledComponents";
import React, {useContext} from "react";
import PokeapiStore from "../../contexts/PokeapiStore";

const NameInput = () => {
    const context = useContext(PokeapiStore);
    return (
        <Input
            data-testid="name-input"
            plaintext onInput={e => context.onFormSubmit(e.target.value)}
            placeholder="Enter pokemon name..."
            defaultValue={context.filteredName}/>
    );
}
export default NameInput;
