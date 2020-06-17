import {
    InputProps,
    Textarea as ChakraTextArea
} from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'


export function TextArea({
    name,
    validate = undefined,
    defaultValue,
    ...rest
}: BaseProps & InputProps<HTMLTextAreaElement>) {
    const { input, meta } = useField(name, {
        initialValue: defaultValue,
        validate,
        parse: (x) => x,
    })
    return (
        <ChakraTextArea
            {...input}
            {...rest}
            isInvalid={meta.error && meta.touched}
        />
    )
}
