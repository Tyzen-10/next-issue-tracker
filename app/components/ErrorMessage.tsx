import React, { PropsWithChildren } from 'react'
import { Text } from '@radix-ui/themes'

const ErrorMessage = ({children}: PropsWithChildren) => {
  return (
    <Text color='red' as='p'>{children}</Text>
  )
}

export default ErrorMessage
//this component can be reused anywhere. and no need to repeatedly enter the color and as prop.