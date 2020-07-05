import React, {
    isValidElement,
    Fragment,
    Children,
    cloneElement,
    ReactNode,
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

export const Form = ({
    onSubmit = (x) => console.log(JSON.stringify(x, null, 4)),
    children,
    ...rest
}: FormProps) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            render={(props) => {
                if (!isValidElement(children)) {
                    return <Fragment>{children}</Fragment>
                }
                return Children.only(cloneElement(children, props))
            }}
            {...rest}
        />
    )
}
