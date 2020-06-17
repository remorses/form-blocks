import { FieldValidator } from 'final-form'

export interface BaseProps {
    name?: string
    validate?: FieldValidator<any>
}
