/* eslint-disable import/no-extraneous-dependencies */
import 'client/bootstrap/style'
import React from 'react'
import { ThemeProvider } from 'glamorous'
import { storiesOf, action } from '@storybook/react'
import theme from 'client/theme'
import Button from 'modules/components/Button'

storiesOf('Button', module)
  .addDecorator(getStory => <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
