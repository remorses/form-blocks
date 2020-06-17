import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export function Switch({ name, validate, ...rest }: BaseProps & SwitchProps) {
    const { input, meta } = useField(name, {
        initialValue: rest.defaultValue,
        validate,
        type: 'option',
        parse: (x) => x,
    })
    return <ChakraSwitch d='block' {...input} {...rest} />
}
