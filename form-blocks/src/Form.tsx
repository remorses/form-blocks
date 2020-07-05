import React, {
    isValidElement,
    Fragment,
    Children,
    cloneElement,
    ReactNode,
    useCallback,
} from 'react'
import {
    Form as FinalForm,
    FormProps as FinalFormProps,
} from 'react-final-form'

export type FormProps = Omit<
    FinalFormProps,
    'onSubmit' | 'render' | 'children'
> & {
    onSubmit?: FinalFormProps['onSubmit']
    children?: ReactNode | ReactNode[]
}

const defaultOnSubmit = (x) => console.log(JSON.stringify(x, null, 4))

export const Form = ({
    onSubmit = defaultOnSubmit,
    children,
    ...rest
}: FormProps) => {
    const renderer = useCallback((props) => {
        if (!isValidElement(children)) {
            return <Fragment>{children}</Fragment>
        }
        return Children.only(cloneElement(children, props))
    }, [])
    return (
        <FinalForm
            subscription={{ submitting: true }}
            onSubmit={onSubmit}
            render={renderer}
            {...rest}
        />
    )
}
