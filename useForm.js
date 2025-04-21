import { useState } from "react";

// hay una pack de terceros especifico para forms.
// react.hook.form 
// se puede mirar e instalar para uso profundo de forms...


export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState( initialForm );

    const onInputChange = ( {target} ) => {
        const {name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onResetForm = ( ) => {
        setFormState( initialForm );
    }    

  return    {
    ...formState, //es igual a desestructurar todos los campos...
    formState,
    onInputChange,
    onResetForm
  }

}
