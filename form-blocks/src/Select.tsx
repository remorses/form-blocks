import { Select as ChakraSelect, SelectProps } from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'

export interface Item {
    value: string
    label?: string
    disabled?: boolean
}

export const Select = ({
    name,
    items,
    ...rest
}: { items: Item[] } & SelectProps & BaseProps) => {
    const {
        input,
        meta: { error, touched },
    } = useField(name, {
        initialValue: rest.defaultValue,
    })
    // useEffect(() => {
    //     items.length && input.onChange(items[1]?.value)
    // }, [items.length])
    return (
        <ChakraSelect {...input} isInvalid={touched && error} {...rest}>
            {items.map(({ value, label, disabled }) => (
                <option key={value} disabled={disabled || false} value={value}>
                    {label || value}
                </option>
            ))}
        </ChakraSelect>
    )
}
