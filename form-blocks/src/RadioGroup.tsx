import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    RadioGroup as ChakraRadioGroup,
    RadioGroupProps,
} from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export const RadioGroup = ({
    label,
    name,
    validate,
    children,
}: BaseProps & RadioGroupProps & { label }) => {
    const { input, meta } = useField(name, { validate })
    return (
        <FormControl isInvalid={meta.touched && meta.invalid} my={4}>
            <FormLabel htmlFor={input.name}>{label}</FormLabel>
            <ChakraRadioGroup {...input}>{children}</ChakraRadioGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}
