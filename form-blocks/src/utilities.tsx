import {
    Box,
    FormControl,
    FormControlProps,
    FormLabel,
    Progress,
    Stack,
    useColorMode,
} from '@chakra-ui/core'
import React, { cloneElement } from 'react'
import { useField, useForm } from 'react-final-form'
import { Switch } from './Switch'

export const ValidationError = ({ name, ...rest }) => {
    const {
        meta: { error, touched },
    } = useField(name, { subscription: { error: true, touched: true } })
    return (
        <>
            {touched && error && (
                <Box color='red.500' {...rest}>
                    {error}
                </Box>
            )}
        </>
    )
}

export function Labelled({
    name,
    label,
    sublabel,
    field,
    ...rest
}: {
    name
    label?: string
    sublabel?: string
    field: React.ReactElement
} & FormControlProps) {
    return (
        <Control p='0' m='0' name={name} {...rest}>
            <Stack spacing='2px'>
                <FormLabel m='0' htmlFor={name}>
                    {label}
                </FormLabel>
                <FormLabel m='0' opacity={0.6}>
                    {sublabel}
                </FormLabel>
                {cloneElement(field, { name })}
                <ValidationError name={name} />
            </Stack>
        </Control>
    )
}

export const PercentComplete = (props) => {
    const form = useForm()
    const numFields = form.getRegisteredFields().length
    const numErrors = Object.keys(form.getState().errors).length
    return (
        <Progress
            borderRadius='4px'
            value={
                numFields === 0
                    ? 0
                    : ((numFields - numErrors) / numFields) * 100
            }
            {...props}
        />
    )
}

const Control = ({ name, ...rest }: { name } & FormControlProps) => {
    const {
        meta: { error, touched },
    } = useField(name, { subscription: { touched: true, error: true } })
    return <FormControl {...rest} isInvalid={error && touched} />
}

export const ColorModeSwitch = (props) => {
    const { toggleColorMode, colorMode } = useColorMode()
    return (
        <Labelled
            name='colorMode'
            label='color mode'
            defaultValue='light'
            field={<Switch onChange={toggleColorMode} />}
            {...props}
        />
    )
}
