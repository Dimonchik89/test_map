import React, { useState } from 'react'
import { TextField } from '@mui/material'

const FormInput = ({ name, label, defaultValue = ""}) => {
    const [value, setValue] = useState(defaultValue)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <TextField 
            name={name}
            label={label} 
            variant="standard" 
            value={value}
            onChange={handleChange}
            className='modal__input'
        />
    )
}

export default FormInput