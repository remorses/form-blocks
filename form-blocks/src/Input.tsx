import { Input as ChakraInput, InputProps } from '@chakra-ui/core'
import { FieldValidator } from 'final-form'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export const Input = ({ name, validate, ...rest }: BaseProps & InputProps) => {
    const { input, meta } = useField(name, {
        initialValue: rest.defaultValue,
        validate,
        parse: (x) => x,
    })
    return (
        <ChakraInput
            {...input}
            isInvalid={meta.error && meta.touched}
            {...rest}
        />
    )
}
