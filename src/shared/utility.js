export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const isValid = (value, validation) => {
    let valid = false;

    if(validation.required) {
        valid = (value.trim() !== '');

        if(valid === false){
            return valid;
        }
    }

    if(validation.length) {
        valid = (value.length === validation.length);

        if(valid === false){
            return valid;
        }
    }

    if(validation.minLength) {
        valid = (value.length >= validation.minLength);

        if(valid === false){
            return valid;
        }
    }

    return valid;
}
