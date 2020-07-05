import {
    Box,
    Button,
    CSSReset,
    Flex,
    Stack,
    Text,
    ThemeProvider,
} from '@chakra-ui/core'
import {
    CheckBox,
    Input,
    Step,
    useStep,
    ValidationError,
    Wizard,
    WizardStepProps,
} from 'form-blocks/src/'
import React from 'react'
import { useForm } from 'react-final-form'

export default function Page({}) {
    return (
        <ThemeProvider>
            <CSSReset />
            <Wizard >
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

export const Step0 = () => {
    const { next } = useStep()
    return (
        <Stack spacing={4} flex='1' justify='center' align='center'>
            <Text fontSize='48px'>Welcome to multi-step-form</Text>
            <Text fontSize='24px'>A react component baked with ❤️</Text>
            <Box flex='1' />
            <Button onClick={next}>begin</Button>
        </Stack>
    )
}

export const Step1 = ({ next, previous }: WizardStepProps) => {
    return (
        <Stack spacing={4} >
            <Text>Your name</Text>
            <Input name='name' placeholder='Insert text 1' />
            <ValidationError name='name' />
            <CheckBox name='iAmDev' placeholder='Insert text 1'>
                i am developer
            </CheckBox>
            <Box flex='1' />
            <Flex mt='auto' justifyContent='space-between'>
                <Button onClick={previous}>previous</Button>
                <Button alignSelf='flex-end' onClick={next}>next</Button>
            </Flex>
        </Stack>
    )
}

export const Step2 = ({ previous, next }: WizardStepProps) => {
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

export const Step3 = ({ previous, next }: WizardStepProps) => {
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

export const Step4 = ({ reset }: WizardStepProps) => {
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
