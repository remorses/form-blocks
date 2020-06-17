import { Checkbox, Stack, StackProps } from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export const CheckBoxGroup = ({
    items,
    name,
    ...rest
}: Omit<StackProps, 'name'> & { items } & BaseProps) => {
    return (
        <Stack spacing='10px' {...rest}>
            {items.map(({ value, label }) => (
                <CheckboxArray
                    value={value}
                    name={name}
                    key={label || value}
                    label={label || value}
                />
            ))}
        </Stack>
    )
}

const CheckboxArray = ({ name, value, label, ...rest }) => {
    const {
        input: { checked, ...input },
        meta: { error, touched },
    } = useField(name, {
        type: 'checkbox', // important for RFF to manage the checked prop
        value, // important for RFF to manage list of strings
    })
    return (
        <Checkbox
            {...input}
            isChecked={checked}
            isInvalid={error && touched}
            {...rest}
        >
            {label}
        </Checkbox>
    )
}
