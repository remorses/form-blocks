import React, { useEffect } from 'react'
import { render } from 'react-dom'
import {
    Wizard,
    WizardStepProps,
    Input,
    ValidationError,
    CheckBox,
    Step,
} from 'form-blocks/src/'
import { Field, useField, useForm } from 'react-final-form'
import {
    Box,
    CSSReset,
    ThemeProvider,
    InputProps,
    Button,
    Text,
    Stack,
    Flex,
    BoxProps,
    Checkbox,
    CheckboxProps,
} from '@chakra-ui/core'

export default function Page({}) {
    return (
        <ThemeProvider>
            <CSSReset />
            <Wizard showValuesAsJson Wrapper={Wrapper}>
                <Step>
                    <Step0 />
                </Step>
                <Step
                    validate={(values) => {
                        const errors = {} as any
                        if (!values.name) {
                            errors.name = 'Field required'
                        }
                        return errors
                    }}
                >
                    <Step1 />
                </Step>
                <Step>
                    <Step2 />
                </Step>
                <Step>
                    <Step3 />
                </Step>
                <Step hideFromHistory>
                    <Step4 />
                </Step>
            </Wizard>
        </ThemeProvider>
    )
}

const Step0 = ({ next }: WizardStepProps) => {
    return (
        <Stack spacing={4} flex='1' justify='center' align='center'>
            <Text fontSize='48px'>Welcome to multi-step-form</Text>
            <Text fontSize='24px'>A react component baked with ❤️</Text>
            <Box flex='1' />
            <Button onClick={next}>begin</Button>
        </Stack>
    )
}

const Step1 = ({ next, previous }: WizardStepProps) => {
    return (
        <Stack spacing={4} flex='1'>
            <Text>Your name</Text>
            <Input name='name' placeholder='Insert text 1' />
            <ValidationError name='name' />
            <CheckBox name='iAmDev' placeholder='Insert text 1'>
                i am developer
            </CheckBox>
            <Box flex='1' />
            <Flex mt='auto' justifyContent='space-between'>
                <Button onClick={previous}>previous</Button>
                <Button onClick={next}>next</Button>
            </Flex>
        </Stack>
    )
}

const Step2 = ({ previous, next }: WizardStepProps) => {
    return (
        <Stack spacing={4} flex='1'>
            <Text>Insert other text</Text>
            <Input name='text3' placeholder='Insert text 2' />
            <Box flex='1' />
            <Flex mt='auto' justifyContent='space-between'>
                <Button onClick={previous}>previous</Button>
                <Button onClick={next}>next</Button>
            </Flex>
        </Stack>
    )
}

const Step3 = ({ previous, next }: WizardStepProps) => {
    return (
        <Stack d='flex' spacing={4} flex='1'>
            <Text>Ok stop now</Text>
            <Input name='text4' placeholder='Insert text 3' />
            <Input name='text5' placeholder='Even more stuff' />
            <Box flex='1' />
            <Flex mt='auto' justifyContent='space-between'>
                <Button onClick={previous}>previous</Button>
                <Button onClick={next}>next</Button>
            </Flex>
        </Stack>
    )
}

const Step4 = ({ reset }: WizardStepProps) => {
    const form = useForm()
    return (
        <Stack d='flex' spacing={4} flex='1' justify='center' align='center'>
            <Text fontSize='48px'>Finished 🥳</Text>
            <Button
                onClick={() => {
                    reset()
                    form.initialize({})
                }}
            >
                reset
            </Button>
        </Stack>
    )
}

export const Wrapper = ({ children }) => {
    return (
        <>
            <Box
                bg='globalBackground'
                maxWidth='100vw'
                height='100vh'
                position='absolute'
                // align='center'
                left='0'
                p={['0', '0', '50px']}
                right='0'
            >
                <Box
                    d='flex'
                    flexDir='column'
                    maxW='1000px'
                    width='100%'
                    position='relative'
                    mx='auto'
                    minH='500px'
                    shadow='0 0 100px rgba(0,0,0,0.1)'
                    p={['20px', '20px', '50px']}
                    // flex='1'
                    borderRadius='20px'
                    bg={{ dark: 'black', light: 'white' }['light']}
                >
                    {children}
                </Box>
            </Box>
        </>
    )
}
