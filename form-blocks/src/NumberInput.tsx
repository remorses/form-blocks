import {
    NumberInput as ChakraNumberInput,
    NumberInputProps,
} from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export const NumberInput = ({
    name,
    validate,
    ...rest
}: BaseProps & NumberInputProps) => {
    const { input, meta } = useField(name, {
        initialValue: rest.defaultValue,
        validate,
        parse: (x) => x,
    })
    return (
        <ChakraNumberInput
            {...input}
            {...rest}
            isInvalid={meta.error && meta.touched}
        />
    )
}
