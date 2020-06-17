import {
    Box,
















    Slider as ChakraSlider, SliderFilledTrack, SliderProps,


    SliderThumb, SliderTrack
} from '@chakra-ui/core'
import React from 'react'
import { useField } from 'react-final-form'
import { BaseProps } from './common'


export function Slider({ name, validate, ...rest }: BaseProps & SliderProps) {
    const { input, meta } = useField(name, {
        initialValue: rest.defaultValue,
        validate,
        parse: (x) => x,
    })
    return (
        <ChakraSlider {...input} {...rest}>
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb size='18px'>
                <Box
                    shadow='lg'
                    w='100%'
                    h='100%'
                    border='1px solid'
                    borderColor='gray.300'
                    borderRadius='100%'
                />
            </SliderThumb>
        </ChakraSlider>
    )
}
