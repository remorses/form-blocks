import { Box, BoxProps, useColorMode } from '@chakra-ui/core'
import { highlight, languages } from 'prismjs/components/prism-core'
import React from 'react'
import { useField } from 'react-final-form'
import Editor from 'react-simple-code-editor'
import { BaseProps } from './common'

export function CodeEditor({
    name,
    language = 'yaml',
    validate = undefined,
    defaultValue,
    ...rest
}: {
    language?: string
    defaultValue
} & BaseProps &
    BoxProps) {
    const { input, meta } = useField(name, {
        defaultValue: defaultValue,
        type: 'string',
        validate,
        parse: (x) => x,
    })
    const { colorMode } = useColorMode()
    return (
        <Box
            border='1px solid'
            borderColor={{ light: 'gray.300', dark: 'gray.700' }[colorMode]}
            // bg={{ light: 'white', dark: 'black.900' }[colorMode]}
            borderRadius='4px'
            {...rest}
        >
            <Editor
                value={(input.value as string) || ''}
                onValueChange={(x) => input.onChange(x || '')}
                highlight={(code) => highlight(code, languages[language])}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    // background: 'black'
                }}
            />
        </Box>
    )
}
