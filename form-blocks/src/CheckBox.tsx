import { Box, Checkbox as ChakraCheckBox, CheckboxProps } from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export const CheckBox = ({
    name,
    label = '',
    ...rest
}: BaseProps & { label?: string } & Omit<CheckboxProps, 'children'>) => {
    const {
        input: { checked, ...input },
        meta: { error, touched, invalid },
    } = useField(name, {
        type: 'checkbox', // important for RFF to manage the checked prop
    })
    return (
        <Box>
            <ChakraCheckBox {...input} {...rest}>
                {label}
            </ChakraCheckBox>
        </Box>
    )
}
