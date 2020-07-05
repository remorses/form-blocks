import { Box, useColorMode, Stack } from '@chakra-ui/core'
import React, {
    Children,
    cloneElement,
    createContext,
    FC,
    Fragment,
    isValidElement,
    ReactElement,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react'
import { Form, useForm, FormSpy } from 'react-final-form'

const QUERY_PAGE_NUMBER = 'stepNumber'

export interface WizardProps {
    showJsonValues?: boolean
    onSubmit?: Function
    wrapper?: any
    children?: ReactElement<StepProps> | Array<ReactElement<StepProps>>
}

function getStoredValues(): any {
    const hash = makeHash()
    if (localStorage.getItem(hash)) {
        try {
            // @ts-ignore
            const v = JSON.parse(localStorage.getItem(hash))
            console.log('loaded values from local storage', v)
            return v
        } catch (e) {
            console.error(
                'could not reload the form values from local storage: ' +
                    localStorage.getItem(hash),
            )
            localStorage.setItem(makeHash(), '{}')
            return {}
        }
    }
    return {}
}

function setValuesInStorage(values) {
    const hash = makeHash()
    console.log('saving values in localStorage', values, 'with hash ', hash)
    localStorage.setItem(hash, JSON.stringify(values))
}

const makeHash = () => {
    const url = new URL(window.location.href)
    const search = url.searchParams
    search.delete(QUERY_PAGE_NUMBER)
    const hash = url.origin + url.pathname + search
    console.log('made hash', hash)
    return hash
}

function setStepInQuery(newStep, replace = false) {
    if (window.history.pushState) {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set(QUERY_PAGE_NUMBER, newStep.toString())
        console.log('setting current step to the query string', newStep)
        const args: [string, string, string] = [
            window.history.state,
            'Step ' + newStep,
            newUrl.search,
        ]
        if (replace) {
            window.history.replaceState(...args)
        } else {
            window.history.pushState(...args)
        }
    }
}

function getStepFromQuery() {
    const url = new URL(window.location.href)
    const stepNum = url.searchParams.get(QUERY_PAGE_NUMBER)
    if (stepNum) {
        return Number(stepNum)
    }
    return 0
}

export interface WizardStepProps {
    isLastStep?: boolean
    isFirstStep?: boolean
    previous?: () => any
    next?: () => any
    reset?: () => any
    currentStep?: number
}

export interface StepProps {
    hideFromHistory?: boolean
    validate?: (values: Record<string, any>) => any
}

export const Step: FC<StepProps> = (props) => {
    const { children, ...rest } = props
    const stepProps = useStep()
    if (!isValidElement(children)) {
        return <Fragment>{children}</Fragment>
    }
    return Children.only(cloneElement(children, { ...rest, ...stepProps }))
}

export const WizardContext = createContext<WizardStepProps>({})

export function useStep(): WizardStepProps {
    return useContext(WizardContext)
}

const defaultOnSubmit = (x) => alert(JSON.stringify(x, null, 4))

export const Wizard = (props: WizardProps) => {
    const {
        showJsonValues: showValuesAsJson,
        children,
        wrapper: Wrapper = DefaultWrapper,
        onSubmit = defaultOnSubmit,
    } = props
    const [state, setState] = useState({ step: 0, values: {} })
    const childrenCount = React.Children.count(children)
    const steps: ReactElement[] = React.Children.toArray(children).filter(
        isValidElement,
    )
    // console.log(steps)

    useEffect(() => {
        // TODO display loading in the mean time
        let values = getStoredValues()
        let step = getStepFromQuery()
        if (!steps[step]) {
            setStepInQuery(0, true)
        }
        setState((state) => ({
            ...state,
            values,
            step,
        }))
    }, [])

    const next = useCallback(
        (values) => {
            setState((state) => {
                const newStep = Math.min(state.step + 1, childrenCount - 1)
                setValuesInStorage(state.values)
                if (!steps[newStep].props?.hideFromHistory) {
                    setStepInQuery(newStep)
                }
                return {
                    ...state,
                    step: newStep,
                    values,
                }
            })
        },
        [steps],
    )

    const previous = useCallback(() => {
        setState((state) => {
            const newStep = Math.max(state.step - 1, 0)
            setStepInQuery(newStep)
            setValuesInStorage(state.values)
            return {
                ...state,
                step: newStep,
            }
        })
    }, [steps])

    const validate = useCallback(
        (values) => {
            // console.log('called validate')
            const activeStep = steps[state.step]
            if (!activeStep) {
                return
            }
            const errors = activeStep.props.validate
                ? activeStep.props.validate(values)
                : {}
            if (errors && Object.keys(errors).length) {
                console.log('validation errors', errors)
            }
            return errors
        },
        [state.step, steps],
    )

    const handleSubmit = useCallback(
        (values) => {
            console.log('called next')
            const isLastStep = state.step === childrenCount - 1
            if (isLastStep) {
                setState((x) => ({ ...x, values }))
                return onSubmit(values)
            }
            next(values)
        },
        [state.step, childrenCount],
    )

    const reset = useCallback(() => {
        setState((state) => {
            if (!steps[0].props?.hideFromHistory) {
                setStepInQuery(0)
            }
            setValuesInStorage(state.values)
            return { ...state, step: 0 }
        })
    }, [])
    // console.log('state', state)

    let activeStep = steps[state.step]

    const renderer = useCallback(
        ({ handleSubmit }) => {
            const stepProps: WizardStepProps = {
                isLastStep: state.step === childrenCount - 1,
                isFirstStep: state.step === 0,
                currentStep: state.step,
                next: handleSubmit,
                reset,
                previous,
            }
            return (
                <Box as='form' height='100%' onSubmit={handleSubmit}>
                    <WizardContext.Provider value={stepProps}>
                        <Wrapper {...stepProps}>
                            {activeStep}
                            {showValuesAsJson && (
                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (
                                        <pre
                                            style={{
                                                opacity: 0.4,
                                                minHeight: '60px',
                                                margin: '20px 0',
                                                padding: '20px',
                                            }}
                                        >
                                            {JSON.stringify(values, null, 4)}
                                        </pre>
                                    )}
                                </FormSpy>
                            )}
                        </Wrapper>
                    </WizardContext.Provider>
                </Box>
            )
        },
        [steps, state, childrenCount],
    )

    return (
        <Form
            initialValues={state.values}
            validate={validate}
            onSubmit={handleSubmit}
            render={renderer}
            subscription={{ submitting: true, pristine: true }}
        />
    )
}

export const DefaultWrapper = ({ children }) => {
    const { colorMode } = useColorMode()
    return (
        <Box
            height='100%'
            minHeight='500px'
            // position='absolute'
            // align='center'
            left='0'
            p={['0', '0', '50px']}
            right='0'
        >
            <Stack
                align='stretch'
                // justify='stretch'
                maxW='1000px'
                position='relative'
                mx='auto'
                minHeight='500px'
                height='100%'
                shadow='0 0 100px rgba(0,0,0,0.1)'
                width='100%'
                p={['6', null, null, '8']}
                // flex='1'
                borderRadius='20px'
                bg={{ dark: 'gray.700', light: 'white' }[colorMode]}
            >
                {children}
            </Stack>
        </Box>
    )
}

// const UpdateValuesState = ({ setValues }) => {
//     const form = useForm()
//     useEffect(() => {
//         const unsubscribe = form.subscribe(
//             ({ values }) => {
//                 setValues(values)
//             },
//             { values: true },
//         )
//         return () => unsubscribe()
//     }, [])
//     return null
// }
